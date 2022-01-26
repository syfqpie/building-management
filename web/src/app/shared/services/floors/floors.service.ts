import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Floor } from './floors.model';

@Injectable({
  providedIn: 'root'
})
export class FloorsService {

  // Data
  public floor: Floor
  public floors: Floor[] = []

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Floor[]> {
    const urlTemp = `${ environment.baseUrl }v1/floors/`
    return this.http.get<Floor[]>(urlTemp).pipe(
      tap((res: Floor[]) => {
        this.floors = res
        // console.log('Floors:', this.floors)
      })
    )
  }

  getOne(id: string | undefined): Observable<Floor> {
    const urlTemp = `${ environment.baseUrl }v1/floors/${ id }/`
    return this.http.get<Floor>(urlTemp).pipe(
      tap((res: Floor) => {
        this.floor = res
        // console.log('Floor:', this.floor)
      })
    )
  }

}
