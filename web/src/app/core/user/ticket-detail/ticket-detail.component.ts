import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { TicketCategory, TicketExtended, TicketPriority, TicketStatus } from 'src/app/shared/services/tickets/tickets.model';
import { AddTicketComponent } from 'src/app/components/tickets/add-ticket/add-ticket.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {

  // Data
  currentTicket: TicketExtended | undefined

  // Predefined
  ticketStatus = TicketStatus
  ticketPriority = TicketPriority
  ticketCategory = TicketCategory

  // Form
  patchForm: FormGroup = new FormGroup({
    title: new FormControl({ disabled: true, value: null }),
    description: new FormControl({ disabled: true, value: null }),
    unit: new FormControl({ disabled: true, value: null }),
    tags: new FormControl([]),
    category: new FormControl({ disabled: true, value: null }),
    assignee: new FormControl({ disabled: true, value: null }),
    priority: new FormControl({ disabled: true, value: null }),
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
  isAssigning: boolean = false
  isNew: boolean = false

  // Subscription
  svcSubscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined

  // Event
  @ViewChild(AddTicketComponent) addTicketComponent: AddTicketComponent | undefined

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketSvc: TicketsService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(
      (params) => {
        // Check if id is supplied
        if (params.get('id')) {
          const id = Number(params.get('id'))
          
          // Check if id is NaN or not
          if (isNaN(id)) {
            this.isNew = true
          } else {
            this.getData(id)
            this.isNew = false
          }
        }
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
    // Unsubscribe route subscription
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  initForm() {
    this.patchForm = this.fb.group({
      title: new FormControl(this.currentTicket?.title),
      description: new FormControl(this.currentTicket?.description, Validators.compose([
        Validators.required,
        Validators.maxLength(512)
      ])),
      unit: new FormControl({ disabled: true, value: null}),
      tags: new FormControl({ disabled: true, value: []}),
      category: new FormControl(this.currentTicket?.category, Validators.compose([
        Validators.required
      ])),
      assignee: new FormControl({ disabled: true, value: null}),
      priority: new FormControl(this.currentTicket?.priority, Validators.compose([
        Validators.required
      ]))
    })
    this.patchForm.disable()
  }

  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(
      this.ticketSvc.getOneExtended(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentTicket = this.ticketSvc.ticketExtended
        this.initForm()
      }
    }))
  }

  enableEdit() {
    this.patchForm.enable()
  }

  cancelEdit() {
    this.patchForm.disable()
  }

}
