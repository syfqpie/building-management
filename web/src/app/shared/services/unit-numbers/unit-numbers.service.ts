import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitNumber } from './unit-numbers.model';

const baseUrl = `${ environment.baseUrl }v1/unit-numbers/`

@Injectable({
  providedIn: 'root'
})
export class UnitNumbersService {

  // Data
  unitNumber: UnitNumber
  unitNumbers: UnitNumber[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<UnitNumber> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  getAll(): Observable<UnitNumber[]> {
    return this.http.get<UnitNumber[]>(baseUrl).pipe(
      tap((res) => {
        this.unitNumbers = res
        // console.log('Unit numbers: ', this.unitNumbers)
      })
    )
  }

  getOne(id: string): Observable<UnitNumber> {
    return this.http.get<UnitNumber>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  patch(id: number, body: any): Observable<UnitNumber> {
    return this.http.patch<UnitNumber>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }


  activate(id: string): Observable<UnitNumber> {
    return this.http.get<UnitNumber>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

  deactivate(id: string): Observable<UnitNumber> {
    return this.http.get<UnitNumber>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.unitNumber = res
        // console.log('Unit number: ', this.unitNumber)
      })
    )
  }

}
