import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { collapsedAnimation } from 'src/app/shared/animations/animation';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import { TicketCategory, TicketPriority } from 'src/app/shared/services/tickets/tickets.model';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
  animations: [
    collapsedAnimation
  ]
})
export class AddTicketComponent implements OnInit, OnDestroy {

  // Predefined
  ticketCategory = TicketCategory
  ticketPriority = TicketPriority

  // Form
  addForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    unit: new FormControl(null),
    tags: new FormControl([]),
    category: new FormControl(null),
    assignee: new FormControl(null),
    priority: new FormControl(null),
  })
  formMessages = {
    title: [
      { type: 'required', message: 'Field is required' },
      { type: 'maxlength', message: 'Field must contain at most 100 character.' }
    ],
    description: [
      { type: 'required', message: 'Field is required' },
      { type: 'maxlength', message: 'Field must contain at most 512 character.' }
    ],
    category: [
      { type: 'required', message: 'Please select' }
    ],
    priority: [
      { type: 'required', message: 'Please select' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isUnitRelated: boolean = false
  isAssigning: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription | undefined

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private notifySvc: NotifyService,
    private ticketSvc: TicketsService
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
    this.addForm = this.fb.group({
      title: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.maxLength(512)
      ])),
      unit: new FormControl({ disabled: true, value: null}),
      tags: new FormControl({ disabled: true, value: []}),
      category: new FormControl(this.ticketCategory.SYS, Validators.compose([
        Validators.required
      ])),
      assignee: new FormControl({ disabled: true, value: null}),
      priority: new FormControl(this.ticketPriority.NORMAL, Validators.compose([
        Validators.required
      ]))
    })
  }

  addTicket() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.ticketSvc.create(this.addForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          'Ticket created'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.addForm.reset()
        this.initForm()

        this.router.navigate(['/management/tickets/detail', this.ticketSvc.ticket?.id])
      }
    })
  }

}
