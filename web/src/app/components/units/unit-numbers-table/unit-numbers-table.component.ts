import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { UnitNumber } from 'src/app/shared/services/unit-number/unit-number.model';
import { UnitNumberService } from 'src/app/shared/services/unit-number/unit-number.service';
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
      { type: 'required', message: 'This field is required' },
      { type: 'unique', message: 'Unit number already exists' }
    ]
  }

  // Table
  ColumnMode = ColumnMode
  tableRows: UnitNumber[] = []
  tableMessages = {
    totalMessage: 'total of records'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left small',
    pagerRightArrow: 'fa-solid fa-angle-right small',
    pagerPrevious: 'fa-solid fa-angles-left small',
    pagerNext: 'fa-solid fa-angles-right small'
  }

  // Checker
  isProcessing: boolean = false
  isAddModalOpen: boolean = false
  isUpdateModalOpen: boolean = false
  
  // Subscription
  subscription: Subscription = new Subscription

  constructor(
     private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private unitNumberSvc: UnitNumberService
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
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.unitNumberSvc.list().subscribe({
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
    }))
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
    this.subscription.add(this.unitNumberSvc.create(
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
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('unitNumber' in err.error) {
            for (let unitNumberErr of err.error['unitNumber']) {
              // Set error
              this.addForm.get('unitNumber')?.setErrors({
                unique: unitNumberErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                unitNumberErr
              )
            }
          }
        }
      },
      complete: () => {
        // Toggle and reset
        this.toggleAddModal()
        this.addForm.reset()
        this.initForm()

        // Update table
        this.getData()
      }
    }))
  }

  patchUnitNumber() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription.add(this.unitNumberSvc.patch(
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
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('unitNumber' in err.error) {
            for (let unitNumberErr of err.error['unitNumber']) {
              // Set error
              this.updateForm.get('unitNumber')?.setErrors({
                unique: unitNumberErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                unitNumberErr
              )
            }
          }
        }
      },
      complete: () => {
        // Toggle and reset
        this.toggleUpdateModal()

        // Update table
        this.getData()
      }
    }))
  }

  toggleAddModal() {
    this.isAddModalOpen = !this.isAddModalOpen

    // Reset
    if (this.isAddModalOpen === false) {
      this.addForm.reset()
      this.initForm()
    }
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
