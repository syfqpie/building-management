import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';

import { PriorityOverviewMonthly, StatusOverviewMonthly, TicketOverview } from 'src/app/shared/services/tickets/tickets.model';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-tickets-overview',
  templateUrl: './tickets-overview.component.html',
  styleUrls: ['./tickets-overview.component.scss']
})
export class TicketsOverviewComponent implements OnInit, OnDestroy {

  // Data
  overview: TicketOverview | undefined
  statusOverview: StatusOverviewMonthly | undefined
  priorityOverview: PriorityOverviewMonthly | undefined

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription = new Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private ticketSvc: TicketsService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      forkJoin([
        this.ticketSvc.getOverview(),
        this.ticketSvc.getStatusOverview(),
        this.ticketSvc.getPriorityOverview()
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
          this.overview = this.ticketSvc.overview
          this.statusOverview = this.ticketSvc.statusOverview
          this.priorityOverview = this.ticketSvc.priorityOverview
        }
      })
    )
  }

}
