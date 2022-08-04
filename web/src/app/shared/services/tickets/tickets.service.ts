import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { 
  Ticket, TicketTag, TicketActivity,
  TicketComment, TicketStatus, TicketPriority,
  TicketCategory, TicketExtended
} from './tickets.model';

const BASE_URL = `${ environment.baseUrl }v1/tickets/`
const BASE_URL_TAG = `${ environment.baseUrl }v1/ticket-tags/`
const BASE_URL_ACTIVITY = `${ environment.baseUrl }v1/ticket-activities/`
const BASE_URL_COMMENT = `${ environment.baseUrl }v1/ticket-comments/`

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // Data
  ticket: TicketExtended | undefined
  tickets: Ticket[] = []
  
  constructor(
    private http: HttpClient
  ) { }

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
        this.ticket = res
        // console.log('Ticket: ', this.ticket)
      })
    )
  }

}
