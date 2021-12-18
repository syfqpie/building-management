import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Floor } from './floors.model';

@Injectable({
  providedIn: 'root'
})
export class FloorsService {

  // URL
  public urlFloors: string = environment.baseUrl + 'v1/floors/'

  // Data
  floor: Floor
  floors: Floor[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Floor> {
    return this.http.post<any>(this.urlFloors, body).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  getAll(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.urlFloors).pipe(
      tap((res) => {
        this.floors = res
        // console.log('Floors: ', this.floors)
      })
    )
  }

  getOne(id: string): Observable<Floor> {
    let urlTemp = this.urlFloors + id + '/'
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  patch(id: number, body: any): Observable<Floor> {
    let urlTemp = this.urlFloors + id + '/'
    return this.http.patch<Floor>(urlTemp, body).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }


  activate(id: string): Observable<Floor> {
    let urlTemp = this.urlFloors + id + '/activate/'
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

  deactivate(id: string): Observable<Floor> {
    let urlTemp = this.urlFloors + id + '/deactivate/'
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res) => {
        this.floor = res
        // console.log('Floor: ', this.floor)
      })
    )
  }

}
