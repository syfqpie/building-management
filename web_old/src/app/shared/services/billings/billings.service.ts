import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Billing, BillingExtended } from './billings.model';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

  // URL
  public urlBillings: string = environment.baseUrl + 'v1/billings/'

  // Data
  billing: Billing
  billings: BillingExtended[] = []
  billingExtended: BillingExtended

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Billing> {
    return this.http.post<any>(this.urlBillings, body).pipe(
      tap((res) => {
        this.billing = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  getAll(): Observable<BillingExtended[]> {
    let urlTemp = this.urlBillings + 'extended_all/'
    return this.http.get<BillingExtended[]>(urlTemp).pipe(
      tap((res) => {
        this.billings = res
        // console.log('Billings: ', this.billings)
      })
    )
  }

  getOne(id: string): Observable<BillingExtended> {
    let urlTemp = this.urlBillings + id + '/extended/'
    return this.http.get<BillingExtended>(urlTemp).pipe(
      tap((res) => {
        this.billingExtended = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  patch(id: String, body: any): Observable<Billing> {
    let urlTemp = this.urlBillings + id + '/'
    return this.http.patch<Billing>(urlTemp, body).pipe(
      tap((res) => {
        this.billing = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  verifyPayment(id: string) {
    let urlTemp = this.urlBillings + id + '/verify_payment/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        this.billingExtended = res
        // console.log('Billing: ', this.billing)
      })
    )
  }

  // deactivate(id: string) {
  //   let urlTemp = this.urlBillings + id + '/deactivate/'
  //   return this.http.get<any>(urlTemp).pipe(
  //     tap((res) => {
  //       this.billing = res
  //       // console.log('Billing: ', this.billing)
  //     })
  //   )
  // }

}
