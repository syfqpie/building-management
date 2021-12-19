import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Billing, BillingExtended } from './billings.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

  // Data
  billing: Billing
  billings: BillingExtended[] = []
  billingExtended: BillingExtended

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Billing> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.billing = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  getAll(): Observable<BillingExtended[]> {
    return this.http.get<BillingExtended[]>(`${ baseUrl }/extended_all/`).pipe(
      tap((res) => {
        this.billings = res
        // console.log('Billings: ', this.billings)
      })
    )
  }

  getOne(id: string): Observable<BillingExtended> {
    return this.http.get<BillingExtended>(`${ baseUrl }${ id }/extended/`).pipe(
      tap((res) => {
        this.billingExtended = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  patch(id: string, body: any): Observable<Billing> {
    return this.http.patch<Billing>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.billing = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  verifyPayment(id: string) {
    return this.http.get<any>(`${ baseUrl }${ id }/verify_payment/`).pipe(
      tap((res) => {
        this.billingExtended = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

}
