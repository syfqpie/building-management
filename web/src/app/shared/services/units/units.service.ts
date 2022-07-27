import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Unit, UnitExtended } from './units.model';
import { DetailResponse } from '../auth/auth.model';

const BASE_URL = `${ environment.baseUrl }v1/units/`

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  // Data
  public unit: Unit | undefined
  public units: Unit[] = []
  public unitExtended: UnitExtended | undefined

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Unit> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Unit>(urlTemp, body).pipe(
      tap((res: Unit) => {
        this.unit = res
        // console.log('Unit:', this.unit)
      })
    )
  }

  getAll(): Observable<Unit[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Unit[]>(urlTemp).pipe(
      tap((res: Unit[]) => {
        this.units = res
        // console.log('Units:', this.units)
      })
    )
  }

  getOne(id: number): Observable<Unit> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Unit>(urlTemp).pipe(
      tap((res: Unit) => {
        this.unit = res
        // console.log('Unit:', this.unit)
      })
    )
  }

  getOneExtended(id: number): Observable<UnitExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res: UnitExtended) => {
        this.unitExtended = res
        console.log('Unit:', this.unitExtended)
      })
    )
  }

  activate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Activate unit: ', res)
      })
    )
  }

  deactivate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Deactivate unit: ', res)
      })
    )
  }

  enableMaintenance(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/enable-maintenance/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Enable maintenance unit: ', res)
      })
    )
  }

  disableMaintenance(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/disable-maintenance/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Disable maintenance unit: ', res)
      })
    )
  }

}
