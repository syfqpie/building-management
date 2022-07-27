import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { UnitsService } from 'src/app/shared/services/units/units.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import { Floor } from 'src/app/shared/services/floors/floors.model';
import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.scss']
})
export class UnitAddComponent implements OnInit, OnDestroy {
  
  @Input() blocks: Block[] = []
  @Input() floors: Floor[] = []
  @Input() unitNumbers: UnitNumber[] = []

  // Form
  addForm: FormGroup = new FormGroup({
    squareFeet: new FormControl(null),
    block: new FormControl(null),
    floor: new FormControl(null),
    unitNumber: new FormControl(null)
  })
  formMessages = {
    squareFeet: [
      { type: 'required', message: 'This field is required' }
    ],
    block: [
      { type: 'required', message: 'This field is required' }
    ],
    floor: [
      { type: 'required', message: 'This field is required' }
    ],
    unitNumber: [
      { type: 'required', message: 'This field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription | undefined

  // Event
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private unitSvc: UnitsService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.addForm = this.fb.group({
      squareFeet: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      block: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      floor: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      unitNumber: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  addUnit() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.unitSvc.create(this.addForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'New unit has been added'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false

        let errorTitle = 'Error'
        if (err.status === 400) {
          if ('nonFieldErrors' in err.error) {
            // Display toastr
            this.notifySvc.error(
              errorTitle,
              err.error.nonFieldErrors
            )
          }
        }
      },
      complete: () => {
        this.toggleModal()
        this.changedEvent.emit(true)
      }
    })
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen

    // Reset
    if (this.isModalOpen === false) {
      this.addForm.reset()
      this.initForm()
    }
  }

}
