import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Renter } from './renters.model';

const BASE_URL = `${ environment.baseUrl }v1/renters/`

@Injectable({
  providedIn: 'root'
})
export class RentersService {

  // Data
  renter: Renter | undefined
  renters: Renter[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Renter[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Renter[]>(urlTemp).pipe(
      tap((res: Renter[]) => {
        this.renters = res
        // console.log('Renters: ', this.renters)
      })
    )
  }

  getOne(id: number): Observable<Renter> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Renter>(urlTemp).pipe(
      tap((res: Renter) => {
        this.renter = res
        // console.log('Renter: ', this.renter)
      })
    )
  }

  activate(id: number): Observable<Renter> {
    const urlTemp = `${ BASE_URL }${ id }/activate/`
    return this.http.get<Renter>(urlTemp).pipe(
      tap((res: Renter) => {
        this.renter = res
        // console.log('Renter: ', this.renter)
      })
    )
  }

  deactivate(id: number): Observable<Renter> {
    const urlTemp = `${ BASE_URL }${ id }/deactivate/`
    return this.http.get<Renter>(urlTemp).pipe(
      tap((res: Renter) => {
        this.renter = res
        // console.log('Renter: ', this.renter)
      })
    )
  }

  search(searchText: string): Observable<Renter[]> {
    const urlTemp = `${ BASE_URL }?search=${ searchText }`
    return this.http.get<Renter[]>(urlTemp).pipe(
      tap((res: Renter[]) => {
        this.renters = res
        // console.log('Renters: ', this.renters)
      })
    )
  }
}
