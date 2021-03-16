import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unit, UnitExtended } from './units.model';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  // URL
  public urlUnits: string = environment.baseUrl + 'v1/units/'

  // Data
  unit: Unit
  units: UnitExtended[] = []
  unitExtended: UnitExtended

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Unit> {
    return this.http.post<any>(this.urlUnits, body).pipe(
      tap((res) => {
        this.unit = res
        // console.log('Unit: ', this.unit)
      })
    )
  }

  getAll(): Observable<UnitExtended[]> {
    let urlTemp = this.urlUnits + 'extended_all/'
    return this.http.get<UnitExtended[]>(urlTemp).pipe(
      tap((res) => {
        this.units = res
        // console.log('Units: ', this.units)
      })
    )
  }

  getOne(id: number): Observable<UnitExtended> {
    let urlTemp = this.urlUnits + id + '/extended/'
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  patch(id: number, body: any): Observable<Unit> {
    let urlTemp = this.urlUnits + id + '/'
    return this.http.patch<Unit>(urlTemp, body).pipe(
      tap((res) => {
        this.unit = res
        // console.log('Unit: ', this.unit)
      })
    )
  }

  activate(id: number): Observable<UnitExtended> {
    let urlTemp = this.urlUnits + id + '/activate/'
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  deactivate(id: number): Observable<UnitExtended> {
    let urlTemp = this.urlUnits + id + '/deactivate/'
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  enableMaintenance(id: number): Observable<UnitExtended> {
    let urlTemp = this.urlUnits + id + '/enable_maintenance/'
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

  disableMaintenance(id: number): Observable<UnitExtended> {
    let urlTemp = this.urlUnits + id + '/disable_maintenance/'
    return this.http.get<UnitExtended>(urlTemp).pipe(
      tap((res) => {
        this.unitExtended = res
        // console.log('Unit: ', this.unitExtended)
      })
    )
  }

}
