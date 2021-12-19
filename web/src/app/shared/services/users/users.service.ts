import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './users.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Data
  user: User
  users: User[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<User> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl).pipe(
      tap((res) => {
        this.users = res
        // console.log('Users: ', this.users)
      })
    )
  }

  getOne(id: string): Observable<User> {
    return this.http.get<User>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  activate(id: string): Observable<User> {
    return this.http.get<User>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  deactivate(id: string): Observable<User> {
    return this.http.get<User>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

}
