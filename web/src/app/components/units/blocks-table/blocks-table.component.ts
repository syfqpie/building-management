import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

@Component({
  selector: 'app-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss']
})
export class BlocksTableComponent implements OnInit, OnDestroy {

  // Data
  blocks: Block[] = []
  selectedBlock: Block | undefined

  // Form
  addForm: FormGroup = new FormGroup({
    block: new FormControl(null)
  })
  updateForm: FormGroup = new FormGroup({
    block: new FormControl(null),
    isActive: new FormControl(null)
  })
  formMessages = {
    block: [
      { type: 'required', message: 'This field is required' },
      { type: 'unique', message: 'Block already exists' }
    ]
  }

  // Table
  tableRows: Block[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
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
  subscription: Subscription | undefined
  addSubscription: Subscription  | undefined
  updateSubscription: Subscription  | undefined

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private blockSvc: BlocksService
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
    this.subscription = this.blockSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.blocks = this.blockSvc.blocks
        this.tableRows = [...this.blocks]
      }
    })
  }

  initForm() {
    this.addForm = this.fb.group({
      block: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    this.updateForm = this.fb.group({
      block: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      isActive: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  // Table on select row
  onSelect(selected: Block) {
    this.selectedBlock = selected
    this.updateForm.controls['block'].setValue(this.selectedBlock.block)
    this.updateForm.controls['isActive'].setValue(this.selectedBlock.isActive)
    this.toggleUpdateModal()
  }

  addBlock() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.addSubscription = this.blockSvc.create(
      this.addForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'New block has been added'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('block' in err.error) {
            for (let blockErr of err.error['block']) {
              // Set error
              this.addForm.get('block')?.setErrors({
                unique: blockErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                blockErr
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
    })
  }

  patchBlock() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.addSubscription = this.blockSvc.patch(
      this.selectedBlock?.id!,
      this.updateForm.value
    ).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'Block has been updated'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('block' in err.error) {
            for (let blockErr of err.error['block']) {
              // Set error
              this.updateForm.get('block')?.setErrors({
                unique: blockErr
              })

              // Display toastr
              this.notifySvc.error(
                errorTitle,
                blockErr
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
    })
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
      this.selectedBlock = undefined
      this.updateForm.reset()
      this.initForm()
    }
  }

}
