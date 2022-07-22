import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Floor } from './floors.model';

const BASE_URL = `${ environment.baseUrl }v1/floors/`

@Injectable({
  providedIn: 'root'
})
export class FloorsService {

  // Data
  public floor: Floor | undefined
  public floors: Floor[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Floor> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Floor>(urlTemp, body).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

  getAll(): Observable<Floor[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Floor[]>(urlTemp).pipe(
      tap((res: Floor[]) => {
        this.floors = res
        console.log('Floors:', this.floors)
      })
    )
  }

  getOne(id: string | undefined): Observable<Floor> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res: Floor) => {
        this.floor = res
        console.log('Floor:', this.floor)
      })
    )
  }

  patch(id: number, body: any): Observable<Floor> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Floor>(urlTemp, body).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

}
