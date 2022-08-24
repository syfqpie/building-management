import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Parking, ParkingExtended } from './parkings.model';

const BASE_URL = `${ environment.baseUrl }v1/parking-lots/`

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  // Data
  parking: Parking | undefined
  parkings: Parking[] = []
  parkingExtended: ParkingExtended | undefined
  parkingsExtended: ParkingExtended[] = []
  
  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Parking> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Parking>(urlTemp, body).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking:', this.parking)
      })
    )
  }

  getAll(): Observable<Parking[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Parking[]>(urlTemp).pipe(
      tap((res: Parking[]) => {
        this.parkings = res
        // console.log('Parkings: ', this.parkings)
      })
    )
  }

  getAllExtended(): Observable<ParkingExtended[]> {
    const urlTemp = `${ BASE_URL }extended/`
    return this.http.get<ParkingExtended[]>(urlTemp).pipe(
      tap((res: ParkingExtended[]) => {
        this.parkingsExtended = res
        // console.log('Parkings: ', this.parkingsExtended)
      })
    )
  }

  getOne(id: number): Observable<Parking> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Parking>(urlTemp).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking: ', this.parking)
      })
    )
  }

  getOneExtended(id: number): Observable<ParkingExtended> {
    const urlTemp = `${ BASE_URL }${ id }/extended/`
    return this.http.get<ParkingExtended>(urlTemp).pipe(
      tap((res: ParkingExtended) => {
        this.parkingExtended = res
        // console.log('Parking: ', this.parkingExtended)
      })
    )
  }

  patch(id: number, body: any): Observable<Parking> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Parking>(urlTemp, body).pipe(
      tap((res: Parking) => {
        this.parking = res
        // console.log('Parking:', this.parking)
      })
    )
  }

}
