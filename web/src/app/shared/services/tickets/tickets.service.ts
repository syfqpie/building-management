import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetailResponse } from '../auth/auth.model';

import { 
  Ticket, TicketTag, TicketActivity,
  TicketComment, TicketStatus, TicketPriority,
  TicketCategory, TicketExtended, TicketCommentExtended,
  TicketOverview
} from './tickets.model';

const BASE_URL = `${ environment.baseUrl }v1/tickets/`

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // Data
  ticket: Ticket | undefined
  tickets: Ticket[] = []
  ticketExtended: TicketExtended | undefined
  comments: TicketCommentExtended[] = []
  overview: TicketOverview | undefined
  
  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Ticket> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Ticket>(urlTemp, body).pipe(
      tap((res: Ticket) => {
        this.ticket = res
        // console.log('Ticket:', this.ticket)
      })
    )
  }

  getAll(): Observable<Ticket[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Ticket[]>(urlTemp).pipe(
      tap((res: Ticket[]) => {
        this.tickets = res
        // console.log('Tickets: ', this.tickets)
      })
    )
  }

  getOneExtended(id: number): Observable<TicketExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<TicketExtended>(urlTemp).pipe(
      tap((res: TicketExtended) => {
        this.ticketExtended = res
        // console.log('Ticket: ', this.ticketExtended)
      })
    )
  }

  patch(id: number, body: any): Observable<Ticket> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Ticket>(urlTemp, body).pipe(
      tap((res: Ticket) => {
        this.ticket = res
        // console.log('Ticket:', this.ticket)
      })
    )
  }
  
  updateStatus(id: number, body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/update-status/`
    return this.http.patch<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Ticket: ', res)
      })
    )
  }

  getComments(ticketId: number): Observable<TicketCommentExtended[]> {
    const urlTemp = `${ BASE_URL }${ ticketId }/comments/`
    return this.http.get<TicketCommentExtended[]>(urlTemp).pipe(
      tap((res: TicketCommentExtended[]) => {
        this.comments = res
        // console.log('Comments: ', this.comments)
      })
    )
  }

  postComment(ticketId: number, body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ ticketId }/comments/add-comment/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Comment: ', res)
      })
    )
  }

  getOverview(): Observable<TicketOverview> {
    const urlTemp = `${ BASE_URL }overview/`
    return this.http.get<TicketOverview>(urlTemp).pipe(
      tap((res: TicketOverview) => {
        this.overview = res
        // console.log('Tickets: ', this.tickets)
      })
    )
  }

}
