import { Component, Input, OnInit } from '@angular/core';
import { TicketActivity, TicketStatus } from 'src/app/shared/services/ticket/ticket.model';

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss']
})
export class ActivityTimelineComponent implements OnInit {

  // Data
  @Input('activities') activities: TicketActivity[] | undefined
  ticketStatus = TicketStatus
  
  constructor() { }

  ngOnInit(): void {
  }

}
