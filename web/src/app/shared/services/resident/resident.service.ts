import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Resident } from './resident.model';

const BASE_URL = `${ environment.baseUrl }v1/residents/`

/**
 * A service for Resident related methods
 */
@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  // Data
  resident: Resident | undefined
  residents: Resident[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Returns a list of residents
   *
   * @returns List of residents
   */
  list(): Observable<Resident[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Resident[]>(urlTemp).pipe(
      tap((res: Resident[]) => {
        this.residents = res
        // console.log('Residents: ', this.residents)
      })
    )
  }

  /**
   * Returns a resident
   * 
   * @param id - resident ID
   *
   * @returns A resident
   */
  retrieve(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  /**
   * Activate a resident
   *
   * @param id - resident ID
   * 
   * @returns Updated resident
   */
  activate(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  /**
   * Deactivate a resident
   *
   * @param id - resident ID
   * 
   * @returns Updated resident
   */
  deactivate(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  /**
   * Search residents through:
   * - residentNo
   * - name
   * - email
   * 
   * @param searchText - Search text to search
   * 
   * @returns List of filtered residents
   */
  search(searchText: string): Observable<Resident[]> {
    const urlTemp = `${ BASE_URL }?search=${ searchText }`
    return this.http.get<Resident[]>(urlTemp).pipe(
      tap((res: Resident[]) => {
        this.residents = res
        // console.log('Residents: ', this.residents)
      })
    )
  }

}
