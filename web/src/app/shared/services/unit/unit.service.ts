import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DetailResponse } from '../auth/auth.model';
import { UnitActivityNested } from '../activity/activity.model';

import { Unit, UnitExtended } from './unit.model';

const BASE_URL = `${ environment.baseUrl }v1/units/`

/**
 * A service for Unit related methods
 */
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  // Data
  public unit: Unit | undefined
  public units: Unit[] = []
  public unitExtended: UnitExtended | undefined
  public unitActivites: UnitActivityNested[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new unit entry
   *
   * @param body - payload
   * @param body.block - block ID
   * @param body.floor - floor ID
   * @param body.unitNumber - unit number ID
   * 
   * @returns New created unit entry
   */
  create(body: any): Observable<Unit> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Unit>(urlTemp, body).pipe(
      tap((res: Unit) => {
        this.unit = res
        // console.log('Unit:', this.unit)
      })
    )
  }

  /**
   * Returns a list of units
   *
   * @returns List of units
   */
  list(): Observable<Unit[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Unit[]>(urlTemp).pipe(
      tap((res: Unit[]) => {
        this.units = res
        // console.log('Units:', this.units)
      })
    )
  }

  /**
   * Returns a unit
   * 
   * @param id - unit ID
   *
   * @returns A unit
   */
  retrieve(id: number): Observable<Unit> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Unit>(urlTemp).pipe(
      tap((res: Unit) => {
        this.unit = res
        // console.log('Unit:', this.unit)
      })
    )
  }

  /**
   * Returns an extended unit
   * 
   * @param id - unit ID
   *
   * @returns An extended unit
   */
   retrieveExtended(id: number): Observable<UnitExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res: UnitExtended) => {
        this.unitExtended = res
        // console.log('Unit:', this.unitExtended)
      })
    )
  }

  /**
   * Activate a unit
   *
   * @param id - unit ID
   * 
   * @returns Detail response message
   */
  activate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Activate unit: ', res)
      })
    )
  }

  /**
   * Deactivate a unit
   *
   * @param id - unit ID
   * 
   * @returns Detail response message
   */
  deactivate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Deactivate unit: ', res)
      })
    )
  }

  /**
   * Enable maintenance a unit
   *
   * @param id - unit ID
   * 
   * @returns Detail response message
   */
  enableMaintenance(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/enable-maintenance/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Enable maintenance unit: ', res)
      })
    )
  }

  /**
   * Disable maintenance a unit
   *
   * @param id - unit ID
   * 
   * @returns Detail response message
   */
  disableMaintenance(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/disable-maintenance/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Disable maintenance unit: ', res)
      })
    )
  }

  /**
   * Assign owner to unit
   * 
   * @param id - unit ID
   * @param body - payload
   * @param body.resident - resident ID
   * @param body.notes - [optional] notes
   *
   * @returns Updated extended unit
   */
  assignOwner(id: number, body: any): Observable<UnitExtended>  {
    const urlTemp = `${ BASE_URL }${ id }/assign-owner/`
    return this.http.post<UnitExtended>(urlTemp, body).pipe(
      tap((res: UnitExtended) => {
        this.unitExtended = res
        // console.log('Assign owner:', this.unitExtended)
      })
    )
  }

  /**
   * Returns latest 5 unit activities list
   *
   * @param id - unit ID
   * 
   * @returns Latest 5 unit activities list
   */
  getUnitActivities(id: number): Observable<UnitActivityNested[]> {
    const urlTemp = `${ BASE_URL }${ id }/activities/`
    return this.http.get<UnitActivityNested[]>(urlTemp).pipe(
      tap((res: UnitActivityNested[]) => {
        this.unitActivites = res
        // console.log('Unit activities:', this.unitActivites)
      })
    )
  }

}
