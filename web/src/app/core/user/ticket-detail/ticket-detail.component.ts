import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import {
  TicketCategory,
  TicketExtended,
  TicketPriority,
  TicketStatus } from 'src/app/shared/services/ticket/ticket.model';
import { UnitNo } from 'src/app/shared/services/unit/unit.model';
import { UserEmail } from 'src/app/shared/services/user/user.model';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { UnitService } from 'src/app/shared/services/unit/unit.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AddTicketComponent } from 'src/app/components/tickets/add-ticket/add-ticket.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {

  // Data
  currentTicket: TicketExtended | undefined
  units: UnitNo[] = []
  assignees: UserEmail[] = []
  originalForm: any = {}
  nextStatus: TicketStatus | undefined

  // Predefined
  ticketStatus = TicketStatus
  ticketPriority = TicketPriority
  ticketCategory = TicketCategory

  // Form
  patchForm: FormGroup = new FormGroup({
    title: new FormControl({ disabled: true, value: null }),
    description: new FormControl({ disabled: true, value: null }),
    unit: new FormControl({ disabled: true, value: null }),
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
  isProcessing: boolean = false // http req
  isNewTicket: boolean = false // create new ticket
  isUpdateStatus: boolean = false // update ticket status
  isUpdateInfo: boolean = false // update ticket informations
  isCompleted: boolean = false // ticket not opened / in_progress
  isFetchingOpts: boolean = false // opts fetching
  isFormUpdated: boolean = false // original === form

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
    private helper: HelpersService,
    private ticketSvc: TicketService,
    private unitSvc: UnitService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(
      (params) => {
        // Check if id is supplied
        if (params.get('id')) {
          const id = Number(params.get('id'))
          
          // Check if id is NaN or not
          if (isNaN(id)) {
            this.isNewTicket = true
          } else {
            this.getData(id)
            this.isNewTicket = false
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
      title: new FormControl({ disabled: true, value: this.currentTicket?.title }, Validators.compose([
        Validators.required
      ])),
      description: new FormControl({ disabled: true, value: this.currentTicket?.description }, Validators.compose([
        Validators.required,
        Validators.maxLength(512)
      ])),
      unit: new FormControl({ disabled: true, value: this.currentTicket?.unit?.id ?? null}),
      category: new FormControl({ disabled: true, value: this.currentTicket?.category }, Validators.compose([
        Validators.required
      ])),
      assignee: new FormControl({ disabled: true, value: this.currentTicket?.assignee?.id ?? null }),
      priority: new FormControl({ disabled: true, value: this.currentTicket?.priority }, Validators.compose([
        Validators.required
      ]))
    })

    // Set original form
    this.originalForm = this.patchForm.value
  }

  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(
      this.ticketSvc.retrieveExtended(id).subscribe({
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

        // Append default options
        if (this.currentTicket?.unit) {
          const defaultUnit = new UnitNo(
            this.currentTicket?.unit.id,
            this.currentTicket?.unit.unitNo
          )
          this.units = [defaultUnit]
        }
        if (this.currentTicket?.assignee) {
          const defaultAssignee = new UserEmail(
            this.currentTicket?.assignee.id,
            this.currentTicket?.assignee.email
          )
          this.assignees = [defaultAssignee]
        }
        if (this.currentTicket?.status && 
          this.currentTicket?.status < 3) {
          this.nextStatus = this.currentTicket?.status + 1
        }

        // Checker if ticket is already completed
        this.isCompleted = (
          this.currentTicket?.status !== this.ticketStatus.OPENED && 
          this.currentTicket?.status !== this.ticketStatus.IN_PROGRESS
        )
        // Set update info to false
        this.isUpdateInfo = false
      }
    }))
  }

  onSelectNextStatus(next: TicketStatus) {
    this.nextStatus = next
  }

  toggleStatusModal() {
    this.isUpdateStatus = !this.isUpdateStatus
  }

  toggleEdit() {
    // Only can edit when ticket is not completed
    if (!this.isCompleted) {
      this.isUpdateInfo = !this.isUpdateInfo

      if (this.isUpdateInfo) {
        this.patchForm.enable()

        if (this.assignees.length < 2 ||
          this.units.length < 2) {
          this.getOpts()
        }
      } else {
        // Reset form to original state
        this.patchForm.reset(this.originalForm)
        
        // Disable form
        this.patchForm.disable()
      }
    } else {
      // Noop
      this.notifySvc.info('Info', 'Ticket already completed')
    }
  }

  getOpts() {
    this.loadingBar.useRef('http').start()
    this.isFetchingOpts = true
    
    this.svcSubscription.add(forkJoin([
      this.unitSvc.list(),
      this.userSvc.filterSimplified('user_type=1')
    ]).subscribe({
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
        this.assignees = this.userSvc.usersChoice
        this.listenToForm()
      }
    }))
  }

  listenToForm() {
    this.svcSubscription.add(
      this.patchForm.valueChanges.subscribe((val: any) => {
        const isChanged = !this.helper.isEqual(this.originalForm, val)
        this.isFormUpdated = isChanged
      })
    )
  }

  saveEdit() {
    const updatedForm = this.helper.getUpdatedObj(this.originalForm, this.patchForm.value)
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(
      this.ticketSvc.patch(this.currentTicket!.id, updatedForm).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        
        this.notifySvc.success(
          'Success', 
          'Ticket updated'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isFetchingOpts = false
        this.notifySvc.success(
          'Error', 
          ''
        )
      },
      complete: () => {
        this.getData(this.currentTicket!.id)
        this.toggleEdit()
      }
    }))
  }
  
}
