import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Complaint, ComplaintExtended } from './complaints.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  // Data
  complaint: Complaint
  complaints: ComplaintExtended[] = []
  complaintExtended: ComplaintExtended

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Complaint> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

  getAll(): Observable<ComplaintExtended[]> {
    return this.http.get<ComplaintExtended[]>(`${ baseUrl }/extended_all/`).pipe(
      tap((res) => {
        this.complaints = res
        // console.log('Complaints: ', this.complaints)
      })
    )
  }

  getOne(id: string): Observable<ComplaintExtended> {
    return this.http.get<ComplaintExtended>(`${ baseUrl }${ id }/extended/`).pipe(
      tap((res) => {
        this.complaintExtended = res
        // console.log('Complaint: ', this.complaintExtended)
      })
    )
  }

  patch(id: string, body: any): Observable<Complaint> {
    return this.http.patch<Complaint>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

  close(id: string) {
    return this.http.get<any>(`${ baseUrl }${ id }/close/`).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

}
