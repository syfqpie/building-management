import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { 
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus } from 'src/app/shared/services/ticket/ticket.model';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { TABLE_CLASS, TABLE_MESSAGES } from 'src/app/shared/constants/datatable.constant';

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
  ColumnMode = ColumnMode
  tableRows: Ticket[] = []
  tableMessages = TABLE_MESSAGES
  tableClass = TABLE_CLASS

  // Checker
  isProcessing: boolean = false
  
  // Subscription
  subscription: Subscription = new Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
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
    
    this.subscription = this.ticketSvc.list().subscribe({
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
        // Assign balues
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
