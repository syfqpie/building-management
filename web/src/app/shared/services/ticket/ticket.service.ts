import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DetailResponse } from '../auth/auth.model';
import { MultiSeries, SingleSeries } from '@swimlane/ngx-charts';

import { 
  Ticket, TicketExtended, 
  TicketCommentExtended,
  TicketOverview
} from './ticket.model';

const BASE_URL = `${ environment.baseUrl }v1/tickets/`

/**
 * A service for Ticket related methods
 */
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // Data
  ticket: Ticket | undefined
  tickets: Ticket[] = []
  ticketExtended: TicketExtended | undefined
  comments: TicketCommentExtended[] = []
  overview: TicketOverview | undefined
  statusOverview: MultiSeries[] = []
  priorityOverview: SingleSeries[] = []
  
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new ticket entry
   *
   * @param body - payload
   * @param body.title - title
   * @param body.description - description
   * @param body.unit - [optional] related unit ID
   * @param body.tags - [optional] related tags ID
   * @param body.category - [optional] category
   * @param body.assignee - [optional] assignee ID
   * @param body.priority - [optional] priority
   * 
   * @returns New created ticket entry
   */
  create(body: any): Observable<Ticket> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Ticket>(urlTemp, body).pipe(
      tap((res: Ticket) => {
        this.ticket = res
        // console.log('Ticket:', this.ticket)
      })
    )
  }

  /**
   * Returns a list of tickets
   *
   * @returns List of tickets
   */
  list(): Observable<Ticket[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Ticket[]>(urlTemp).pipe(
      tap((res: Ticket[]) => {
        this.tickets = res
        // console.log('Tickets: ', this.tickets)
      })
    )
  }

  /**
   * Returns an extended ticket
   * 
   * @param id - ticket ID
   *
   * @returns An extended ticket
   */
  retrieveExtended(id: number): Observable<TicketExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<TicketExtended>(urlTemp).pipe(
      tap((res: TicketExtended) => {
        this.ticketExtended = res
        // console.log('Ticket: ', this.ticketExtended)
      })
    )
  }

  /**
   * Partial update a ticket
   *
   * @param id - ticket ID
   * @param body - payload
   * @param body.title - [optional] title
   * @param body.description - [optional] description
   * @param body.unit - [optional] related unit ID
   * @param body.tags - [optional] related tags ID
   * @param body.category - [optional] category
   * @param body.assignee - [optional] assignee ID
   * @param body.priority - [optional] priority
   * 
   * @returns Updated ticket
   */
  patch(id: number, body: any): Observable<Ticket> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Ticket>(urlTemp, body).pipe(
      tap((res: Ticket) => {
        this.ticket = res
        // console.log('Ticket:', this.ticket)
      })
    )
  }
  
  /**
   * Update ticket status
   *
   * @param id - ticket ID
   * @param body - payload
   * @param body.status - status to change to
   * @param body.notes - notes
   * 
   * @returns Detail response message
   */
  updateStatus(id: number, body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/update-status/`
    return this.http.patch<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Ticket: ', res)
      })
    )
  }

  /**
   * Returns a list of extended ticket comments
   * 
   * @param ticketId - ticket ID
   *
   * @returns List of extended ticket comments
   */
  getComments(ticketId: number): Observable<TicketCommentExtended[]> {
    const urlTemp = `${ BASE_URL }${ ticketId }/comments/`
    return this.http.get<TicketCommentExtended[]>(urlTemp).pipe(
      tap((res: TicketCommentExtended[]) => {
        this.comments = res
        // console.log('Comments: ', this.comments)
      })
    )
  }

  /**
   * Post a comment
   *
   * @param ticketId - ticket ID
   * @param body - payload
   * @param body.comment - comment
   * @param body.replyTo - [optional] comment ID to reply to
   * 
   * @returns Detail response message
   */
  postComment(ticketId: number, body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ ticketId }/comments/add-comment/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Comment: ', res)
      })
    )
  }

  /**
   * Returns an overview of ticket
   *
   * @returns Overview of ticket
   */
  getOverview(): Observable<TicketOverview> {
    const urlTemp = `${ BASE_URL }overview/`
    return this.http.get<TicketOverview>(urlTemp).pipe(
      tap((res: TicketOverview) => {
        this.overview = res
        // console.log('Ticket overview: ', this.overview)
      })
    )
  }

  /**
   * Returns an overview of ticket status
   *
   * @returns Overview of ticket status
   */
  getStatusOverview(): Observable<MultiSeries[]> {
    const urlTemp = `${ BASE_URL }status-overview/`
    return this.http.get<MultiSeries[]>(urlTemp).pipe(
      tap((res: MultiSeries[]) => {
        this.statusOverview = res
        // console.log('Status overview: ', this.statusOverview)
      })
    )
  }

  /**
   * Returns an overview of ticket priority
   *
   * @returns Overview of ticket priority
   */
  getPriorityOverview(): Observable<SingleSeries[]> {
    const urlTemp = `${ BASE_URL }priority-overview/`
    return this.http.get<SingleSeries[]>(urlTemp).pipe(
      tap((res: SingleSeries[]) => {
        this.priorityOverview = res
        // console.log('Priority overview: ', this.priorityOverview)
      })
    )
  }

}
