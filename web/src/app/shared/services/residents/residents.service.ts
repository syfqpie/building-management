import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Resident } from './residents.model';

const BASE_URL = `${ environment.baseUrl }v1/residents/`

@Injectable({
  providedIn: 'root'
})
export class ResidentsService {

  // Data
  resident: Resident | undefined
  residents: Resident[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Resident[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Resident[]>(urlTemp).pipe(
      tap((res: Resident[]) => {
        this.residents = res
        // console.log('Residents: ', this.residents)
      })
    )
  }

  getOne(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  activate(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  deactivate(id: number): Observable<Resident> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<Resident>(urlTemp).pipe(
      tap((res: Resident) => {
        this.resident = res
        // console.log('Resident: ', this.resident)
      })
    )
  }

  search(searchText: string): Observable<Resident[]> {
    const urlTemp = `${ BASE_URL }?search=${ searchText }`
    return this.http.get<Resident[]>(urlTemp).pipe(
      tap((res: Resident[]) => {
        this.residents = res
        // console.log('Residents: ', this.residents)
      })
    )
  }

}
