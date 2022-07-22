import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Floor } from 'src/app/shared/services/floors/floors.model';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

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
      { type: 'required', message: 'This field is required' }
    ]
  }

  // Table
  tableRows: Floor[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of records'
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
    this.subscription = this.floorSvc.getAll().subscribe({
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
    })
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
    this.addSubscription = this.floorSvc.create(
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

  patchFloor() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.addSubscription = this.floorSvc.patch(
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
      this.selectedFloor= undefined
      this.updateForm.reset()
      this.initForm()
    }
  }

}
