import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { Floor } from 'src/app/shared/services/floors/floors.model';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';

@Component({
  selector: 'app-floors-table',
  templateUrl: './floors-table.component.html',
  styleUrls: ['./floors-table.component.scss']
})
export class FloorsTableComponent implements OnInit, OnDestroy {

  // Data
  floors: Floor[] = []
  selectedFloor: Floor | undefined

  // Form
  addForm: FormGroup = new FormGroup({
    floor: new FormControl(null)
  })
  updateForm: FormGroup = new FormGroup({
    floor: new FormControl(null),
    isActive: new FormControl(null)
  })
  formMessages = {
    floor: [
      { type: 'required', message: 'This field is required' },
      { type: 'unique', message: 'Floor already exists' }
    ]
  }

  // Table
  ColumnMode = ColumnMode
  tableRows: Floor[] = []
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
    private floorSvc: FloorsService
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

    this.subscription.add(this.floorSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.floors = this.floorSvc.floors
        this.tableRows = [...this.floors]
      }
    }))
  }

  initForm() {
    this.addForm = this.fb.group({
      floor: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    this.updateForm = this.fb.group({
      floor: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      isActive: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  // Table on select row
  onSelect(selected: Floor) {
    this.selectedFloor = selected
    this.updateForm.controls['floor'].setValue(this.selectedFloor.floor)
    this.updateForm.controls['isActive'].setValue(this.selectedFloor.isActive)
    this.toggleUpdateModal()
  }

  addFloor() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.floorSvc.create(
      this.addForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'New floor has been added'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('floor' in err.error) {
            for (let floorErr of err.error['floor']) {
              // Set error
              this.addForm.get('floor')?.setErrors({
                unique: floorErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                floorErr
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

  patchFloor() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.floorSvc.patch(
      this.selectedFloor?.id!,
      this.updateForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'Floor has been updated'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('floor' in err.error) {
            for (let floorErr of err.error['floor']) {
              // Set error
              this.updateForm.get('floor')?.setErrors({
                unique: floorErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                floorErr
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
      this.selectedFloor= undefined
      this.updateForm.reset()
      this.initForm()
    }
  }

}
