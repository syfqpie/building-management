import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
   * Returns a list of vehicles
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

  /**
   * Create a new vehicle entry
   *
   * @returns A vehicle
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

}
