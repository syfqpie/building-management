import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Proprietor } from './proprietors.model';

const baseUrl = `${ environment.baseUrl }v1/proprietors/`

@Injectable({
  providedIn: 'root'
})
export class ProprietorsService {

  // Data
  proprietor: Proprietor
  proprietors: Proprietor[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Proprietor> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  getAll(): Observable<Proprietor[]> {
    return this.http.get<Proprietor[]>(baseUrl).pipe(
      tap((res) => {
        this.proprietors = res
        // console.log('Proprietors: ', this.proprietors)
      })
    )
  }

  getOne(id: string): Observable<Proprietor> {
    return this.http.get<Proprietor>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  patch(id: any, body: any): Observable<Proprietor> {
    return this.http.patch<any>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  activate(id: string): Observable<Proprietor> {
    return this.http.get<Proprietor>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  deactivate(id: string): Observable<Proprietor> {
    return this.http.get<Proprietor>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  search(body: any): Observable<Proprietor[]> {
    return this.http.post<Proprietor[]>(`${ baseUrl }search/`, body).pipe(
      tap((res) => {
        this.proprietors = res
        // console.log('Proprietors: ', this.proprietors)
      })
    )
  }

}
