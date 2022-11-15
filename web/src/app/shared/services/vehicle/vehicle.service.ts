import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Vehicle, VehicleExtended } from './vehicle.model';

const BASE_URL = `${ environment.baseUrl }v1/vehicles/`

/**
 * A service for Vehicle related methods
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // Data
  public vehicle: Vehicle | undefined
  public vehicles: Vehicle[] = []
  public vehicleExtended: VehicleExtended | undefined

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create a new vehicle entry
   * 
   * @param body - payload
   * @param body.plateNo - vehicle plate no. 
   * @param body.resident - resident owner ID
   * @param body.vehicleType - [optional] vehicle type
   *
   * @returns New created vehicle entry
   */
   create(body: any): Observable<Vehicle> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Vehicle>(urlTemp, body).pipe(
      tap((res: Vehicle) => {
        this.vehicle = res
        // console.log('Vehicle:', this.vehicle)
      })
    )
  }

  /**
   * Returns a list of vehicles
   * 
   * @param filterStr - string filter
   *
   * @returns List of vehicles
   */
  list(filterStr?: string): Observable<Vehicle[]> {
    const qStr = filterStr ? `?${filterStr}` : ''
    const urlTemp = `${ BASE_URL }${ qStr }`
    return this.http.get<Vehicle[]>(urlTemp).pipe(
      tap((res: Vehicle[]) => {
        this.vehicles = res
        // console.log('Vehicles:', this.vehicles)
      })
    )
  }

  /**
   * Returns a specific vehicle
   * 
   * @param id - vehicle ID
   *
   * @returns A vehicle
   */
  retrieve(id: number): Observable<Vehicle> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Vehicle>(urlTemp).pipe(
      tap((res: Vehicle) => {
        this.vehicle = res
        // console.log('Vehicle:', this.vehicle)
      })
    )
  }

  /**
   * Returns an extended specific vehicle
   * 
   * @param id - vehicle ID
   *
   * @returns An extended vehicle
   */
  retrieveExtended(id: number): Observable<VehicleExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<VehicleExtended>(urlTemp).pipe(
      tap((res: VehicleExtended) => {
        this.vehicleExtended = res
        // console.log('Vehicle:', this.vehicleExtended)
      })
    )
  }

}
