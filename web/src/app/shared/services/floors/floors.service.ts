import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Floor } from './floors.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class FloorsService {

  // Data
  floor: Floor
  floors: Floor[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Floor> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  getAll(): Observable<Floor[]> {
    return this.http.get<Floor[]>(baseUrl).pipe(
      tap((res) => {
        this.floors = res
        // console.log('Floors: ', this.floors)
      })
    )
  }

  getOne(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  patch(id: number, body: any): Observable<Floor> {
    return this.http.patch<Floor>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }


  activate(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  deactivate(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

}
