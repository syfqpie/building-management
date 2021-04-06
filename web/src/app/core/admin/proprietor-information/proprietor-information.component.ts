import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { FormGroup } from '@angular/forms';
import { Proprietor } from 'src/app/shared/services/proprietors/proprietors.model';
import { ProprietorsService } from 'src/app/shared/services/proprietors/proprietors.service';
import { Genders } from 'src/app/shared/codes/gender';
import { Titles } from 'src/app/shared/codes/title';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { ComplaintExtended } from 'src/app/shared/services/complaints/complaints.model';
import { animate, style, transition, trigger } from '@angular/animations';
// import { NgxCoolDialogsService } from '@csiro-geoanalytics/ngx-cool-dialogs';

@Component({
  selector: 'app-proprietor-information',
  templateUrl: './proprietor-information.component.html',
  styleUrls: ['./proprietor-information.component.scss'],
  animations: [
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
export class ProprietorInformationComponent implements OnInit {

  // Data
  id
  proprietor: Proprietor
  units: UnitExtended[] = []
  complaints: ComplaintExtended[] = []

  totalPendings: number = 0
  totalUnits: number = 0
  totalComplaints: number = 0

  // Table
  tableUnitEntries: number = 5;
  tableUnitSelected: any[] = [];
  tableUnitTemp = [];
  tableUnitActiveRow: any;
  tableUnitRows: any[] = []

  tableComplaintEntries: number = 5;
  tableComplaintSelected: any[] = [];
  tableComplaintTemp = [];
  tableComplaintActiveRow: any;
  tableComplaintRows: any[] = []

  // Predefined
  genders = Genders
  titles = Titles
  
  // Form
  proprietorForm: FormGroup

  // Toggler
  confirmModal: boolean = false

  // Checker
  isEdit: boolean = false

  // Subscriber
  subscription: Subscription
  subscriptionDialog: Subscription

  constructor(
    private proprietorService: ProprietorsService,
    // private dialog: NgxCoolDialogsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

    if (this.subscriptionDialog) {
      this.subscriptionDialog.unsubscribe()
    }
  }

  getData() {
    this.subscription = this.proprietorService.getOne(this.id).subscribe(
      () => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.proprietor = this.proprietorService.proprietor

        this.tableUnitRows = [...this.units]
        this.tableUnitTemp = this.tableUnitRows.map((prop, key) => {
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
      },
      () => {
        // Unsuccess
        this.loadingBar.useRef('http').complete()
      },
      () => {
        // Add value to variables
        this.proprietorForm.controls['nric'].patchValue(this.proprietor['nric'])
        this.proprietorForm.controls['gender'].patchValue(this.proprietor['gender'])
        this.proprietorForm.controls['phone_number'].patchValue(this.proprietor['phone_number'])
        this.proprietorForm.controls['email'].patchValue(this.proprietor['email'])
        this.proprietorForm.controls['moved_in_at'].patchValue(this.proprietor['moved_in_at'])
        this.proprietorForm.controls['moved_out_at'].patchValue(this.proprietor['moved_out_at'])

        // Disable form
        this.proprietorForm.controls['name'].disable()
        this.proprietorForm.controls['nric'].disable()
        this.proprietorForm.controls['gender'].disable()
        this.proprietorForm.controls['phone_number'].disable()
        this.proprietorForm.controls['email'].disable()
        this.proprietorForm.controls['moved_in_at'].disable()
        this.proprietorForm.controls['moved_out_at'].disable()
      }
    )
  }

  initForm() {
    this.proprietorForm = this.fb.group({
      nric: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      gender: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      phone_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      moved_in_at: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      moved_out_at: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  toggleEdit() {
    // Disable form
    if (this.isEdit) {
      this.isEdit = false
      this.proprietorForm.controls['name'].disable()
      this.proprietorForm.controls['nric'].disable()
      this.proprietorForm.controls['gender'].disable()
      this.proprietorForm.controls['phone_number'].disable()
      this.proprietorForm.controls['email'].disable()
      this.proprietorForm.controls['moved_in_at'].disable()
      this.proprietorForm.controls['moved_out_at'].disable()
    }
    // Enable form
    else {
      this.isEdit = true
      this.proprietorForm.controls['name'].enable()
      this.proprietorForm.controls['nric'].enable()
      this.proprietorForm.controls['gender'].enable()
      this.proprietorForm.controls['phone_number'].enable()
      this.proprietorForm.controls['email'].enable()
      this.proprietorForm.controls['moved_in_at'].enable()
      this.proprietorForm.controls['moved_out_at'].enable()
    }
  }

  toggleConfirmModal(type) {
    this.confirmModal = !this.confirmModal
    if (type === 'open') {
    }
    else if (type === 'close') {
      this.toggleEdit()
      this.notify.openToastrInfo('', 'Closed')
    }
    else if (type === 'cancel') {
      this.toggleEdit()
      this.notify.openToastrInfo('', 'Canceled')
    }
    else if (type === 'success') {
    }
    else if (type === 'error') {
    }
  }

  save() {
    this.loadingBar.useRef('http').start()
    this.subscriptionDialog = this.proprietorService.patch(this.id, this.proprietorForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrSuccess('', 'Updated user information')
        this.toggleConfirmModal('success')
        this.toggleEdit()
      },
      () => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrError('', 'Error')
        this.toggleConfirmModal('error')
        this.toggleEdit()
      },
      () => { 
        this.getData()
      }
    )
  }

  navigate(path) {
    return this.router.navigate([path])
  }

}
