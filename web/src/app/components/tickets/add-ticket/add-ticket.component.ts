import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { collapsedAnimation } from 'src/app/shared/animations/animation';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { TicketCategory, TicketPriority } from 'src/app/shared/services/tickets/tickets.model';
import { UnitNo } from 'src/app/shared/services/units/units.model';
import { UserEmail } from 'src/app/shared/services/user/user.model';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { UnitsService } from 'src/app/shared/services/units/units.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
  animations: [
    collapsedAnimation
  ]
})
export class AddTicketComponent implements OnInit, OnDestroy {

  // Data
  units: UnitNo[] = []
  assignees: UserEmail[] = []

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
  isProcessing: boolean = false // http req
  isUnitRelated: boolean = false // is form unit related
  isAssigning: boolean = false // is form assigning assignee
  isFetchingOpts: boolean = false // opts fetching

  // Subscription
  subscription: Subscription = new Subscription

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private notifySvc: NotifyService,
    private ticketSvc: TicketsService,
    private unitSvc: UnitsService,
    private userSvc: UserService
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

    this.subscription.add(this.ticketSvc.create(this.addForm.value).subscribe({
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
        // Reset and re-init form
        this.addForm.reset()
        this.initForm()
        
        // Navigate to new ticket
        this.router.navigate(['/management/tickets/detail', this.ticketSvc.ticket?.id])
      }
    }))
  }

  toggleAssigning() {
    this.isAssigning = !this.isAssigning

    if (this.isAssigning) {
      // Enable field
      this.addForm.get('assignee')?.enable()

      // Get data if choice = 0
      if (this.assignees.length === 0) {
        this.getAssignees()
      }
    } else {
      // Reset field
      this.addForm.get('assignee')?.patchValue(null)
      // Disable field
      this.addForm.get('assignee')?.disable()
    }
  }

  toggleUnitRelated() {
    this.isUnitRelated = !this.isUnitRelated

    if (this.isUnitRelated) {
      // Enable field
      this.addForm.get('unit')?.enable()

      // Get data if choice = 0
      if (this.units.length === 0) {
        this.getUnits()
      }
    } else {
      // Reset field
      this.addForm.get('unit')?.patchValue(null)
      // Disable field
      this.addForm.get('unit')?.disable()
    }
  }

  getAssignees() {
    this.loadingBar.useRef('http').start()
    this.isFetchingOpts = true

    this.subscription.add(this.userSvc.filterSimplified('user_type=1').subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isFetchingOpts = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isFetchingOpts = false
      },
      complete: () => {
        this.assignees = this.userSvc.usersChoice
      }
    }))
  }

  getUnits() {
    this.loadingBar.useRef('http').start()
    this.isFetchingOpts = true
    
    this.subscription.add(this.unitSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isFetchingOpts = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isFetchingOpts = false
      },
      complete: () => {
        this.units = this.unitSvc.units
      }
    }))
  }

}
