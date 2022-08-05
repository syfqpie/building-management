import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { TicketExtended } from 'src/app/shared/services/tickets/tickets.model';
import { AddTicketComponent } from 'src/app/components/tickets/add-ticket/add-ticket.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {

  // Data
  currentTicket: TicketExtended | undefined

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
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketSvc: TicketsService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(
      (params) => {
        if (params.get('id')) {
          const id = Number(params.get('id'))
          
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
      }
    }))
  }

}
