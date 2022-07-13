import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Unit } from './units.model';

const BASE_URL = `${ environment.baseUrl }v1/units/`

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  // Data
  public unit: Unit | undefined
  public units: Unit[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Unit[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Unit[]>(urlTemp).pipe(
      tap((res: Unit[]) => {
        this.units = res
        console.log('Units:', this.units)
      })
    )
  }

  getOne(id: string | undefined): Observable<Unit> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Unit>(urlTemp).pipe(
      tap((res: Unit) => {
        this.unit = res
        console.log('Unit:', this.unit)
      })
    )
  }

}
