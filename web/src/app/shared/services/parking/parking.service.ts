import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DetailResponse } from '../auth/auth.model';

import { Parking, ParkingExtended, ParkingPassCurrent } from './parking.model';

const BASE_URL = `${ environment.baseUrl }v1/parking-lots/`

/**
 * A service for Parking related methods
 */
@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  // Data
  parking: Parking | undefined
  parkings: Parking[] = []
  parkingExtended: ParkingExtended | undefined
  parkingsExtended: ParkingExtended[] = []
  currentPass: ParkingPassCurrent | undefined
  
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new parking entry
   *
   * @param body - payload
   * @param body.block - block ID
   * @param body.floor - floor ID
   * @param body.lotType - [optional] lot type VehicleType
   * 
   * @returns New created parking entry
   */
  create(body: any): Observable<Parking> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Parking>(urlTemp, body).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking:', this.parking)
      })
    )
  }

  /**
   * Returns a list of parkings
   *
   * @returns List of parkings
   */
  list(): Observable<Parking[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Parking[]>(urlTemp).pipe(
      tap((res: Parking[]) => {
        this.parkings = res
        // console.log('Parkings: ', this.parkings)
      })
    )
  }

  /**
   * Returns a list of extended parkings
   *
   * @returns List of extended parkings
   */
  listExtended(): Observable<ParkingExtended[]> {
    const urlTemp = `${ BASE_URL }extended/`
    return this.http.get<ParkingExtended[]>(urlTemp).pipe(
      tap((res: ParkingExtended[]) => {
        this.parkingsExtended = res
        // console.log('Parkings: ', this.parkingsExtended)
      })
    )
  }

  /**
   * Returns a parking
   * 
   * @param id - parking ID
   *
   * @returns A parking
   */
  retrieve(id: number): Observable<Parking> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Parking>(urlTemp).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking: ', this.parking)
      })
    )
  }

  /**
   * Returns an extended parking
   * 
   * @param id - parking ID
   *
   * @returns An extended parking
   */
  retrieveExtended(id: number): Observable<ParkingExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<ParkingExtended>(urlTemp).pipe(
      tap((res: ParkingExtended) => {
        this.parkingExtended = res
        // console.log('Parking: ', this.parkingExtended)
      })
    )
  }

  /**
   * Partial update a parking
   *
   * @param id - parking ID
   * @param body - payload
   * @param body.block - [optional] block ID
   * @param body.floor - [optional] floor ID
   * @param body.lotType - [optional] lot type VehicleType
   * 
   * @returns Updated parking
   */
  patch(id: number, body: any): Observable<Parking> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Parking>(urlTemp, body).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking:', this.parking)
      })
    )
  }

  /**
   * Activate a parking lot
   *
   * @param id - parking lot ID
   * 
   * @returns Detail response message
   */
  activate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Activate parking: ', res)
      })
    )
  }

  /**
   * Deactivate a parking lot
   *
   * @param id - parking lot ID
   * 
   * @returns Detail response message
   */
  deactivate(id: number): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<DetailResponse>(urlTemp).pipe(
      tap((res: DetailResponse) => {
        // console.log('Deactivate parking: ', res)
      })
    )
  }

  /**
   * Assign resident to parking lot
   * 
   * @param id - parking ID
   * @param body - payload
   * @param body.resident - resident ID
   * @param body.vehicle - vehicle ID
   *
   * @returns Updated extended parking
   */
  assignResident(id: number, body: any): Observable<ParkingExtended>  {
    const urlTemp = `${ BASE_URL }${ id }/assign-resident/`
    return this.http.post<ParkingExtended>(urlTemp, body).pipe(
      tap((res: ParkingExtended) => {
        this.parkingExtended = res
        // console.log('Assign resident:', this.parkingExtended)
      })
    )
  }

  /**
   * Checkout resident from parking lot
   *
   * @param id - parking ID
   * 
   * @returns Updated extended parking
   */
  checkoutResident(id: number): Observable<ParkingExtended> {
    const urlTemp = `${ BASE_URL }${ id }/checkout-resident/`
    return this.http.get<ParkingExtended>(urlTemp).pipe(
      tap((res: ParkingExtended) => {
        this.parkingExtended = res
        // console.log('Checkout resident:', this.parkingExtended)
      })
    )
  }

  /**
   * Returns current parking pass
   *
   * @param id - parking pass ID
   * 
   * @returns Current parking pass
   */
  getCurrentPass(id: number): Observable<ParkingPassCurrent> {
    const urlTemp = `${ BASE_URL }${ id }/get-current-pass/`
    return this.http.get<ParkingPassCurrent>(urlTemp).pipe(
      tap((res: ParkingPassCurrent) => {
        this.currentPass = res
        // console.log('Current pass: ', this.currentPass)
      })
    )
  }

}
