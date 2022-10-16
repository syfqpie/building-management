import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { Floor } from 'src/app/shared/services/floors/floors.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';
import { ParkingService } from 'src/app/shared/services/parking/parking.service';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.scss']
})
export class AddParkingComponent implements OnInit, OnDestroy {

  // Data
  blocks: Block[] = []
  floors: Floor[] = []

  // Form
  addForm: FormGroup = new FormGroup({
    block: new FormControl(null),
    floor: new FormControl(null)
  })
  formMessages = {
    block: [
      { type: 'required', message: 'Field is required' }
    ],
    floor: [
      { type: 'required', message: 'Field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription = new Subscription

  // Event
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private blockSvc: BlocksService,
    private floorSvc: FloorsService,
    private parkingSvc: ParkingService
  ) { }

  ngOnInit(): void {
    this.initForm()

    // Get opts if blocks or floors is empty
    if (this.blockSvc.blocks.length === 0 ||
      this.floorSvc.floors.length === 0) {
      this.getData()
    } else {
      this.blocks = this.blockSvc.blocks
      this.floors = this.floorSvc.floors
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(forkJoin([
      this.blockSvc.getAll(),
      this.floorSvc.getAll()
    ]).subscribe({
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
        this.floors = this.floorSvc.floors
      }
    }))
  }

  initForm() {
    this.addForm = this.fb.group({
      block: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      floor: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  addParking() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    
    this.subscription.add(this.parkingSvc.create(this.addForm.value).subscribe({
      next: (res) => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'New parking lot has been added'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        let errorTitle = 'Error'
        let errorMsg = err
        if (err.status !== 0) {
          if (err.status === 404) {
            errorTitle = String(err.status)
            errorMsg = 'Not found'
          } else if ('nonFieldErrors' in err.error) {
            errorMsg = err.error.nonFieldErrors[0]
          } else if (err.status === 403) {
            err['detail']
          }
        }
        this.notifySvc.error(errorTitle, errorMsg)
      },
      complete: () => {
        this.toggleEvent.emit()
        this.changedEvent.emit(true)
      }
    }))
  }

  toggleModal() {
    this.toggleEvent.emit(true)
  }

}
