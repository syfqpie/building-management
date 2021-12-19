import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unit, UnitExtended } from './units.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  // Data
  unit: Unit
  units: UnitExtended[] = []
  unitExtended: UnitExtended

  statistics: any

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Unit> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.unit = res
        // console.log('Unit: ', this.unit)
      })
    )
  }

  getAll(): Observable<UnitExtended[]> {
    return this.http.get<UnitExtended[]>(`${ baseUrl }extended_all/`).pipe(
      tap((res) => {
        this.units = res
        // console.log('Units: ', this.units)
      })
    )
  }

  getOne(id: number): Observable<UnitExtended> {
    return this.http.get<UnitExtended>(`${ baseUrl }${ id }/extended_all/`).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  patch(id: number, body: any): Observable<Unit> {
    return this.http.patch<Unit>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.unit = res
        // console.log('Unit: ', this.unit)
      })
    )
  }

  activate(id: number): Observable<UnitExtended> {
    return this.http.get<UnitExtended>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  deactivate(id: number): Observable<UnitExtended> {
    return this.http.get<UnitExtended>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  enableMaintenance(id: number): Observable<UnitExtended> {
    return this.http.get<UnitExtended>(`${ baseUrl }${ id }/enable-maintenance/`).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  disableMaintenance(id: number): Observable<UnitExtended> {
    return this.http.get<UnitExtended>(`${ baseUrl }${ id }/disable-maintenance/`).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  getOwnershipCount(): Observable<any> {
    return this.http.get<any>(`${ baseUrl }get-ownership-count/`).pipe(
      tap((res) => {
        this.statistics = res
        // console.log('Statistics: ', this.statistics)
      })
    )
  }

}
