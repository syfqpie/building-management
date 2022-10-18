import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { UnitNumber } from './unit-number.model';

const BASE_URL = `${ environment.baseUrl }v1/unit-numbers/`

/**
 * A service for UnitNumber related methods
 */
@Injectable({
  providedIn: 'root'
})
export class UnitNumberService {

  // Data
  public unitNumber: UnitNumber | undefined
  public unitNumbers: UnitNumber[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new unit number entry
   *
   * @param body - payload
   * @param body.unitNumber - unit number name
   * 
   * @returns New created unit number entry
   */
  create(body: any): Observable<UnitNumber> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<UnitNumber>(urlTemp, body).pipe(
      tap((res: UnitNumber) => {
        this.unitNumber = res
        // console.log('Unit number:', this.unitNumber)
      })
    )
  }

  /**
   * Returns a list of unit numbers
   *
   * @returns List of unit numbers
   */
  list(): Observable<UnitNumber[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<UnitNumber[]>(urlTemp).pipe(
      tap((res: UnitNumber[]) => {
        this.unitNumbers = res
        // console.log('Unit numbers:', this.unitNumbers)
      })
    )
  }

  /**
   * Returns a unit number
   * 
   * @param id - unit number ID
   *
   * @returns A unit number
   */
  retrieve(id: number | undefined): Observable<UnitNumber> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res: UnitNumber) => {
        this.unitNumber = res
        // console.log('Unit number:', this.unitNumber)
      })
    )
  }

  /**
   * Partial update a unit number
   *
   * @param id - unit number ID
   * @param body - payload
   * @param body.unitNumber - unit number name
   * 
   * @returns Updated unit number
   */
  patch(id: number, body: any): Observable<UnitNumber> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<UnitNumber>(urlTemp, body).pipe(
      tap((res: UnitNumber) => {
        this.unitNumber = res
        // console.log('Unit number:', this.unitNumber)
      })
    )
  }

}
