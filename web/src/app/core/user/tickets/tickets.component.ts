import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { 
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus } from 'src/app/shared/services/tickets/tickets.model';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {

  // Data
  tickets: Ticket[] = []

  // Predefined
  ticketCategory = TicketCategory
  ticketPriority = TicketPriority
  ticketStatus = TicketStatus

  // Table
  tableRows: Ticket[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of records'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left small',
    pagerRightArrow: 'fa-solid fa-angle-right small',
    pagerPrevious: 'fa-solid fa-angles-left small',
    pagerNext: 'fa-solid fa-angles-right small'
  }

  // Checker
  isProcessing: boolean = false
  
  // Subscription
  subscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
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
    
    this.subscription = this.ticketSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.tickets = this.ticketSvc.tickets
        this.tableRows = [...this.tickets]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/tickets/detail', selected])
  }

}
