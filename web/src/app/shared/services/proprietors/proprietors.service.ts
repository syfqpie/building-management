import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Proprietor } from './proprietors.model';

@Injectable({
  providedIn: 'root'
})
export class ProprietorsService {

  // URL
  public urlProprietors: string = environment.baseUrl + 'v1/proprietors/'

  // Data
  proprietor: Proprietor
  proprietors: Proprietor[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Proprietor> {
    return this.http.post<any>(this.urlProprietors, body).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  getAll(): Observable<Proprietor[]> {
    return this.http.get<Proprietor[]>(this.urlProprietors).pipe(
      tap((res) => {
        this.proprietors = res
        // console.log('Proprietors: ', this.proprietors)
      })
    )
  }

  getOne(id: string): Observable<Proprietor> {
    let urlTemp = this.urlProprietors + id + '/'
    return this.http.get<Proprietor>(urlTemp).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  patch(id: any, body: any): Observable<Proprietor> {
    let urlTemp = this.urlProprietors + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  activate(id: string): Observable<Proprietor> {
    let urlTemp = this.urlProprietors + id + '/activate/'
    return this.http.get<Proprietor>(urlTemp).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

  deactivate(id: string): Observable<Proprietor> {
    let urlTemp = this.urlProprietors + id + '/deactivate/'
    return this.http.get<Proprietor>(urlTemp).pipe(
      tap((res) => {
        this.proprietor = res
        // console.log('Proprietor: ', this.proprietor)
      })
    )
  }

}
