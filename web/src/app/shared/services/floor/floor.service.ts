import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Floor } from './floor.model';

const BASE_URL = `${ environment.baseUrl }v1/floors/`

/**
 * A service for Floor related methods
 */
@Injectable({
  providedIn: 'root'
})
export class FloorService {

  // Data
  public floor: Floor | undefined
  public floors: Floor[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new floor entry
   *
   * @param body - payload
   * @param body.floor - floor name
   * 
   * @returns New created floor entry
   */
  create(body: any): Observable<Floor> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Floor>(urlTemp, body).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

  /**
   * Returns a list of floors
   *
   * @returns List of floors
   */
  list(): Observable<Floor[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Floor[]>(urlTemp).pipe(
      tap((res: Floor[]) => {
        this.floors = res
        // console.log('Floors:', this.floors)
      })
    )
  }

  /**
   * Returns a floor
   * 
   * @param id - floor ID
   *
   * @returns A floor
   */
  retrieve(id: number | undefined): Observable<Floor> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

  /**
   * Partial update a floor
   *
   * @param id - floor ID
   * @param body - payload
   * @param body.floor - floor name
   * 
   * @returns Updated floor
   */
  patch(id: number, body: any): Observable<Floor> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Floor>(urlTemp, body).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

}
