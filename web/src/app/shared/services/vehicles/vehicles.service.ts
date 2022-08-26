import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Vehicle } from './vehicles.model';
import { DetailResponse } from '../auth/auth.model';
import { UnitActivityNested } from '../activities/activities.model';

const BASE_URL = `${ environment.baseUrl }v1/vehicles/`

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  // Data
  public vehicle: Vehicle | undefined
  public vehicles: Vehicle[] = []

  constructor(
    private http: HttpClient
  ) { }

  list(filterStr?: string): Observable<Vehicle[]> {
    const qStr = filterStr ? `?${filterStr}` : ''
    const urlTemp = `${ BASE_URL }${ qStr }`
    return this.http.get<Vehicle[]>(urlTemp).pipe(
      tap((res: Vehicle[]) => {
        this.vehicles = res
        console.log('Vehicles:', this.vehicles)
      })
    )
  }

  create(body: any): Observable<Vehicle> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Vehicle>(urlTemp, body).pipe(
      tap((res: Vehicle) => {
        this.vehicle = res
        console.log('Vehicle:', this.vehicle)
      })
    )
  }

}
