import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { TicketStatus } from 'src/app/shared/services/ticket/ticket.model';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';

@Component({
  selector: 'app-update-ticket-status',
  templateUrl: './update-ticket-status.component.html',
  styleUrls: ['./update-ticket-status.component.scss']
})
export class UpdateTicketStatusComponent implements OnInit, OnDestroy {

  // Input
  @Input('ticketId') ticketId: number | undefined
  @Input('nextStatus') nextStatus: TicketStatus | undefined

  // Form
  updateForm: FormGroup = new FormGroup({
    status: new FormControl(null),
    notes: new FormControl(null)
  })
  formMessages = {
    notes: [
      { type: 'required', message: 'Field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription | undefined

  // Event
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private ticketSvc: TicketService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.updateForm = this.fb.group({
      status: new FormControl(this.nextStatus, Validators.compose([
        Validators.required
      ])),
      notes: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  updateStatus() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    
    this.subscription = this.ticketSvc.updateStatus(this.ticketId!, this.updateForm.value).subscribe({
      next: (res) => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          res.detail
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
    })
  }

  toggleModal() {
    this.toggleEvent.emit(true)
  }

}
