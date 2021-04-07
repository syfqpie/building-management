import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { FormGroup } from '@angular/forms';
import { Complaint } from 'src/app/shared/services/complaints/complaints.model';
import { ComplaintsService } from 'src/app/shared/services/complaints/complaints.service';
import { Proprietor } from 'src/app/shared/services/proprietors/proprietors.model';
import { ProprietorsService } from 'src/app/shared/services/proprietors/proprietors.service';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';
import { Billing } from 'src/app/shared/services/billings/billings.model';
import { Status } from 'src/app/shared/codes/status';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-unit-information',
	templateUrl: './unit-information.component.html',
	styleUrls: ['./unit-information.component.scss'],
	animations: [
		trigger('collapseTrigger', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('100ms ease-out', style({ opacity: 1 })),
			]),
			transition(':leave', [
				style({ opacity: 1 }),
				animate('75ms ease-in', style({ opacity: 0 }))
			])
		]),
		trigger('toggleTrigger', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('100ms', style({ opacity: 1 })),
			]),
			transition(':leave', [
				animate('100ms', style({ opacity: 0 }))
			])
		])
	]
})
export class UnitInformationComponent implements OnInit {

	// Ref
	@ViewChild('btnActionRef', { static: false }) btnActionRef: ElementRef;
	@ViewChild('actions', { static: false }) actions: ElementRef;

	// Data
	id
	unit: UnitExtended
	proprietors: Proprietor[] = []
	complaints: Complaint[] = []
	billings: Billing[] = []
	selectedProprietor: Proprietor

	totalPendings: number = 0
	totalBillings: number = 0
	totalComplaints: number = 0

	// Predefined
	statusList = Status

	// Table
	tableBillingEntries: number = 5;
	tableBillingSelected: any[] = [];
	tableBillingTemp = [];
	tableBillingActiveRow: any;
	tableBillingRows: any[] = []

	tableComplaintEntries: number = 5;
	tableComplaintSelected: any[] = [];
	tableComplaintTemp = [];
	tableComplaintActiveRow: any;
	tableComplaintRows: any[] = []

	// Form
	unitForm: FormGroup
	queryForm: FormGroup

	// Toggler
	isCollapsed: boolean = false
	isMaintenance: boolean = false
	isActive: boolean = true
	isOwned: boolean = false
	isAfterView: boolean = false
	isShowResults: boolean = false
	isShowSwapResults: boolean = false

	// Modal
	addModal: boolean = false
	patchModal: boolean = false
	activateModal: boolean = false
	deactivateModal: boolean = false
	enableMaintenanceModal: boolean = false
	disableMaintenanceModal: boolean = false
	addProprietorModal: boolean = false
	swapProprietorModal: boolean = false

	// Subscription
	subscription: Subscription

	// Listener
	listener: any

	// Icons
	iconEmpty = '/assets/img/icons/folder.svg'

	constructor(
		private unitService: UnitsService,
		private proprietorService: ProprietorsService,
		private fb: FormBuilder,
		private loadingBar: LoadingBarService,
		private notify: NotifyService,
		private route: ActivatedRoute,
		private router: Router
	) {
		// Init data
		this.id = this.route.snapshot.queryParamMap.get('id')
		if (!this.id) {
			this.navigate('/admin/units-management/units')
		}

		if (
			this.id && (
				typeof this.id === 'string' ||
				this.id instanceof String
			)
		) {
			this.getData()
			this.initForm()
		}
		else {
			this.navigate('/admin/units-management/units')
		}
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	ngAfterViewInit(): void {
		// Bind on doc
		document.addEventListener('click', this.offClickHandler.bind(this));
	}

	getData() {
		this.loadingBar.useRef('http').start()
		this.subscription = forkJoin([
			this.unitService.getOne(this.id),
			this.proprietorService.getAll()
		]).subscribe(
			() => {
				// Success
				this.loadingBar.useRef('http').complete()
				this.unit = this.unitService.unitExtended
				this.proprietors = this.proprietorService.proprietors
				this.complaints = this.unitService.unitExtended['unit_complaints']
			},
			() => {
				// Unsuccess
				this.loadingBar.useRef('http').complete()
			},
			() => {
				// Tables
				this.tableBillingRows = [...this.billings]
				this.tableBillingTemp = this.tableBillingRows.map((prop, key) => {
					return {
						...prop,
						id_table: key
					};
				});

				this.tableComplaintRows = [...this.complaints]
				this.tableComplaintTemp = this.tableComplaintRows.map((prop, key) => {
					return {
						...prop,
						id_table: key
					};
				});

				// Toggle
				if (this.unit['proprietor']) {
					this.isOwned = true
				}
				else {
					this.isOwned = false
				}

				if (this.unit['is_active']) {
					this.isActive = true
				}
				else {
					this.isActive = false
				}

				if (this.unit['is_maintenance']) {
					this.isMaintenance = true
				}
				else {
					this.isMaintenance = false
				}
			}
		)
	}

	initForm() {
		this.queryForm = this.fb.group({
			text: new FormControl(null, Validators.compose([
				Validators.required
			]))
		})

		this.unitForm = this.fb.group({
			proprietor: new FormControl(null, Validators.compose([
				Validators.required
			]))
		})
	}

	navigate(path) {
		return this.router.navigate([path])
	}

	toggleActions(event) {
		this.isCollapsed = !this.isCollapsed
	}

	offClickHandler(event: any) {
		// Check click origin
		if (!this.btnActionRef.nativeElement.contains(event.target)) {
			if (this.isCollapsed) {
				this.isCollapsed = !this.isCollapsed
			}
		}
	}

	search(event) {
		// console.log('Event: ', event.key)
		console.log('Form event: ', this.queryForm.value['text'])
		this.loadingBar.useRef('http').start()
		this.subscription = this.proprietorService.search(this.queryForm.value).subscribe(
			() => { 
				this.loadingBar.useRef('http').complete()
			},
			() => {
				this.loadingBar.useRef('http').complete()
			},
			() => {
				this.proprietors = this.proprietorService.proprietors
				this.isShowResults = true
			}
		)
	}

	selectResult(selected) {
		this.selectedProprietor = selected
		this.unitForm.controls['proprietor'].patchValue(this.selectedProprietor['id'])
		this.isShowResults = false
		// console.log(selected)
	}

	patchProprietor() {
		this.loadingBar.useRef('http').start()
		this.subscription = this.unitService.patch(this.id, this.unitForm.value).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
				this.toggleConfirmModal('success-swap-proprietor')
				this.togglePatchModal('success')
			},
			() => {
				this.loadingBar.useRef('http').complete()
				this.notify.openToastrError('', 'Error')
				this.toggleConfirmModal('error-swap-proprietor')
				this.togglePatchModal('error')
			},
			() => {
				this.getData()
			}
		)
	}

	activateUnit() {
		this.loadingBar.useRef('http').start()
		this.subscription = this.unitService.activate(this.id).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
				this.toggleConfirmModal('success-activate-unit')
			},
			() => {
				this.loadingBar.useRef('http').complete()
				this.notify.openToastrError('', 'Error')
				this.toggleConfirmModal('error-activate-unit')
			},
			() => {
				this.getData()
			}
		)
	}

	deactivateUnit() {
		this.loadingBar.useRef('http').start()
		this.subscription = this.unitService.deactivate(this.id).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
				this.toggleConfirmModal('success-deactivate-unit')
			},
			() => {
				this.loadingBar.useRef('http').complete()
				this.notify.openToastrError('', 'Error')
				this.toggleConfirmModal('error-deactivate-unit')
			},
			() => {
				this.getData()
			}
		)
	}

	enableMaintenance() {
		this.loadingBar.useRef('http').start()
		this.subscription = this.unitService.enableMaintenance(this.id).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
				this.toggleConfirmModal('success-enable-maintenance')
			},
			() => {
				this.loadingBar.useRef('http').complete()
				this.notify.openToastrError('', 'Error')
				this.toggleConfirmModal('error-enable-maintenance')
			},
			() => {
				this.getData()
			}
		)
	}

	disableMaintenance() {
		this.loadingBar.useRef('http').start()
		this.subscription = this.unitService.disableMaintenance(this.id).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
				this.toggleConfirmModal('success-disable-maintenance')
			},
			() => {
				this.loadingBar.useRef('http').complete()
				this.notify.openToastrError('', 'Error')
				this.toggleConfirmModal('error-disable-maintenance')
			},
			() => {
				this.getData()
			}
		)
	}

	toggleAddModal(type) {
		this.addModal = !this.addModal;
		this.isShowResults = false
		this.queryForm.reset()

		if (type === 'open') {
		}
		else if (type === 'close') {
		  this.notify.openToastrInfo('', 'Closed')
		  this.selectedProprietor = null
		}
		else if (type === 'cancel') {
		  this.notify.openToastrInfo('', 'Canceled')
		  this.selectedProprietor = null
		}
		else if (type === 'success') {
			this.selectedProprietor = null
		}
	}

	togglePatchModal(type) {
		this.patchModal = !this.patchModal;
		this.isShowSwapResults = false
		this.queryForm.reset()

		if (type === 'open') {
		}
		else if (type === 'close') {
		  this.notify.openToastrInfo('', 'Closed')
		  this.selectedProprietor = null
		}
		else if (type === 'cancel') {
		  this.notify.openToastrInfo('', 'Canceled')
		  this.selectedProprietor = null
		}
		else if (type === 'success') {
			this.selectedProprietor = null
		}
	}

	toggleConfirmModal(type) {
		//  Open
		if (type === 'open-activate-unit') {
			this.activateModal = true
		}
		else if (type === 'open-deactivate-unit') {
			this.deactivateModal = true
		}
		else if (type === 'open-enable-maintenance') {
			this.enableMaintenanceModal = true
		}
		else if (type === 'open-disable-maintenance') {
			this.disableMaintenanceModal = true
		}
		else if (type === 'open-add-proprietor') {
			this.addProprietorModal = true
		}
		else if (type === 'open-swap-proprietor') {
			this.swapProprietorModal = true
		}
		// Close
		else if (type === 'close-activate-unit') {
			this.activateModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		else if (type === 'close-deactivate-unit') {
			this.deactivateModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		else if (type === 'close-enable-maintenance') {
			this.enableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		else if (type === 'close-disable-maintenance') {
			this.disableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		else if (type === 'close-add-proprietor') {
			this.addProprietorModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		else if (type === 'closed-swap-proprietor') {
			this.swapProprietorModal = false
			this.notify.openToastrInfo('', 'Closed')
		}
		// Cancel
		else if (type === 'cancel-activate-unit') {
			this.activateModal = false
			this.notify.openToastrInfo('', 'Canceled')
		}
		else if (type === 'cancel-deactivate-unit') {
			this.deactivateModal = false
			this.notify.openToastrInfo('', 'Canceled')
		}
		else if (type === 'cancel-enable-maintenance') {
			this.enableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Canceled')
		}
		else if (type === 'cancel-disable-maintenance') {
			this.disableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Canceled')
		}
		else if (type === 'cancel-add-proprietor') {
			this.addProprietorModal = false
			this.notify.openToastrInfo('', 'Cancel')
		}
		else if (type === 'cancel-swap-proprietor') {
			this.swapProprietorModal = false
			this.notify.openToastrInfo('', 'Cancel')
		}
		// Success
		else if (type === 'success-activate-unit') {
			this.activateModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		else if (type === 'success-deactivate-unit') {
			this.deactivateModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		else if (type === 'success-enable-maintenance') {
			this.enableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		else if (type === 'success-disable-maintenance') {
			this.disableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		else if (type === 'success-add-proprietor') {
			this.addProprietorModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		else if (type === 'success-swap-proprietor') {
			this.swapProprietorModal = false
			this.notify.openToastrInfo('', 'Success')
		}
		// Error
		else if (type === 'error-activate-unit') {
			this.activateModal = false
			this.notify.openToastrInfo('', 'Error')
		}
		else if (type === 'error-deactivate-unit') {
			this.deactivateModal = false
			this.notify.openToastrInfo('', 'Error')
		}
		else if (type === 'error-enable-maintenance') {
			this.enableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Error')
		}
		else if (type === 'error-disable-maintenance') {
			this.disableMaintenanceModal = false
			this.notify.openToastrInfo('', 'Error')
		}
		else if (type === 'error-add-proprietor') {
			this.addProprietorModal = false
			this.notify.openToastrInfo('', 'Error')
		}
		else if (type === 'error-swap-proprietor') {
			this.swapProprietorModal = false
			this.notify.openToastrInfo('', 'Error')
		}
	}

}
