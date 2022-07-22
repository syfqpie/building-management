import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

@Component({
  selector: 'app-unit-numbers-table',
  templateUrl: './unit-numbers-table.component.html',
  styleUrls: ['./unit-numbers-table.component.scss']
})
export class UnitNumbersTableComponent implements OnInit, OnDestroy {

  // Data
  unitNumbers: UnitNumber[] = []
  selectedUnitNumber: UnitNumber | undefined

  // Form
  addForm: FormGroup = new FormGroup({
    unitNumber: new FormControl(null)
  })
  updateForm: FormGroup = new FormGroup({
    unitNumber: new FormControl(null),
    isActive: new FormControl(null)
  })
  formMessages = {
    unitNumber: [
      { type: 'required', message: 'This field is required' }
    ]
  }

  // Table
  tableRows: UnitNumber[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of unit numbers'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left ms-1 small',
    pagerRightArrow: 'fa-solid fa-angle-right ms-1 small',
    pagerPrevious: 'fa-solid fa-angles-left ms-1 small',
    pagerNext: 'fa-solid fa-angles-right ms-1 small'
  }

  // Checker
  isProcessing: boolean = false
  isAddModalOpen: boolean = false
  isUpdateModalOpen: boolean = false
  
  // Subscription
  subscription: Subscription | undefined
  addSubscription: Subscription  | undefined
  updateSubscription: Subscription  | undefined

  constructor(
     private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private unitNumberSvc: UnitNumbersService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.addSubscription) {
      this.addSubscription.unsubscribe()
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.unitNumberSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.unitNumbers = this.unitNumberSvc.unitNumbers
        this.tableRows = [...this.unitNumbers]
      }
    })
  }

  initForm() {
    this.addForm = this.fb.group({
      unitNumber: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    this.updateForm = this.fb.group({
      unitNumber: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      isActive: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }


  // Table on select row
  onSelect(selected: UnitNumber) {
    this.selectedUnitNumber = selected
    this.updateForm.controls['unitNumber'].setValue(this.selectedUnitNumber.unitNumber)
    this.updateForm.controls['isActive'].setValue(this.selectedUnitNumber.isActive)
    this.toggleUpdateModal()
  }

  addUnitNumber() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.addSubscription = this.unitNumberSvc.create(
      this.addForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'New unit number has been added'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        // Toggle and reset
        this.toggleAddModal()
        this.addForm.reset()
        this.initForm()

        // Update table
        this.getData()
      }
    })
  }

  patchUnitNumber() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.addSubscription = this.unitNumberSvc.patch(
      this.selectedUnitNumber?.id!,
      this.updateForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'Unit number has been updated'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        // Toggle and reset
        this.toggleUpdateModal()

        // Update table
        this.getData()
      }
    })
  }

  toggleAddModal() {
    return this.isAddModalOpen = !this.isAddModalOpen
  }

  toggleUpdateModal() {
    this.isUpdateModalOpen = !this.isUpdateModalOpen

    // Reset
    if (this.isUpdateModalOpen === false) {
      this.selectedUnitNumber = undefined
      this.updateForm.reset()
      this.initForm()
    }
  }

}
