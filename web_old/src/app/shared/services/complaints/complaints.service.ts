import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Complaint, ComplaintExtended } from './complaints.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  // URL
  public urlComplaints: string = environment.baseUrl + 'v1/complaints/'

  // Data
  complaint: Complaint
  complaints: ComplaintExtended[] = []
  complaintExtended: ComplaintExtended
  // complaintsExtende: ComplaintExtended[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Complaint> {
    return this.http.post<any>(this.urlComplaints, body).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

  getAll(): Observable<ComplaintExtended[]> {
    let urlTemp = this.urlComplaints + 'extended_all/'
    return this.http.get<ComplaintExtended[]>(urlTemp).pipe(
      tap((res) => {
        this.complaints = res
        // console.log('Complaints: ', this.complaints)
      })
    )
  }

  getOne(id: string): Observable<ComplaintExtended> {
    let urlTemp = this.urlComplaints + id + '/extended/'
    return this.http.get<ComplaintExtended>(urlTemp).pipe(
      tap((res) => {
        this.complaintExtended = res
        // console.log('Complaint: ', this.complaintExtended)
      })
    )
  }

  patch(id: String, body: any): Observable<Complaint> {
    let urlTemp = this.urlComplaints + id + '/'
    return this.http.patch<Complaint>(urlTemp, body).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

  close(id: string) {
    let urlTemp = this.urlComplaints + id + '/close/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        this.complaint = res
        // console.log('Complaint: ', this.complaint)
      })
    )
  }

}
