import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { Color, colorSets, MultiSeries, SingleSeries } from '@swimlane/ngx-charts';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { TicketOverview } from 'src/app/shared/services/ticket/ticket.model';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-overview',
  templateUrl: './tickets-overview.component.html',
  styleUrls: ['./tickets-overview.component.scss']
})
export class TicketsOverviewComponent implements OnInit, OnDestroy {

  // Data
  overview: TicketOverview | undefined
  statusOverview: MultiSeries[] = []
  priorityOverview: SingleSeries[] = []

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription = new Subscription

  // Chart
  colorScheme: string | Color = colorSets[12]

  constructor(
    private loadingBar: LoadingBarService,
    private ticketSvc: TicketService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    // For loading status
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      forkJoin([
        this.ticketSvc.getOverview(),
        this.ticketSvc.getStatusOverview(),
        this.ticketSvc.getPriorityOverview()
      ]).subscribe({
        next: () => {
          // Update loading status
          this.loadingBar.useRef('http').complete()
          this.isProcessing = false
        },
        error: () => {
          // Update loading status
          this.loadingBar.useRef('http').stop()
          this.isProcessing = false
        },
        complete: () => {
          // Assign values
          this.overview = this.ticketSvc.overview
          this.statusOverview = this.ticketSvc.statusOverview
          this.priorityOverview = this.ticketSvc.priorityOverview
        }
      })
    )
  }

  // axis formatting
  axisFormat(val: number) {
    if (!isNaN(val) && val % 1 === 0) {
      return val.toLocaleString()
    } else {
      return ''
    }
  }

}
