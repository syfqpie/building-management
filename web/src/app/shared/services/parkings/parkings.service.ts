import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Parking } from './parkings.model';

const BASE_URL = `${ environment.baseUrl }v1/parking-lots/`

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  // Data
  parking: Parking | undefined
  parkings: Parking[] = []
  
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
