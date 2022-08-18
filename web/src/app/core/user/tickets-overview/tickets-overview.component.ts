import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Color, colorSets } from '@swimlane/ngx-charts';
import { forkJoin, Subscription } from 'rxjs';

import { MultiSeries, SingleSeries, TicketOverview } from 'src/app/shared/services/tickets/tickets.model';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

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

  // axis formatting
  axisFormat(val: number) {
    if (!isNaN(val) && val % 1 === 0) {
      return val.toLocaleString()
    } else {
      return ''
    }
  }

}
