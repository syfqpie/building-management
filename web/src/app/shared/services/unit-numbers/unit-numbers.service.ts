import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitNumber } from './unit-numbers.model';

@Injectable({
  providedIn: 'root'
})
export class UnitNumbersService {

  // URL
  public urlUnitNumbers: string = environment.baseUrl + 'v1/unit-numbers/'

  // Data
  unitNumber: UnitNumber
  unitNumbers: UnitNumber[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<UnitNumber> {
    return this.http.post<any>(this.urlUnitNumbers, body).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  getAll(): Observable<UnitNumber[]> {
    return this.http.get<UnitNumber[]>(this.urlUnitNumbers).pipe(
      tap((res) => {
        this.unitNumbers = res
        // console.log('Unit numbers: ', this.unitNumbers)
      })
    )
  }

  getOne(id: string): Observable<UnitNumber> {
    let urlTemp = this.urlUnitNumbers + id + '/'
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  patch(id: number, body: any): Observable<UnitNumber> {
    let urlTemp = this.urlUnitNumbers + id + '/'
    return this.http.patch<UnitNumber>(urlTemp, body).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }


  activate(id: string): Observable<UnitNumber> {
    let urlTemp = this.urlUnitNumbers + id + '/activate/'
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  deactivate(id: string): Observable<UnitNumber> {
    let urlTemp = this.urlUnitNumbers + id + '/deactivate/'
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

}
