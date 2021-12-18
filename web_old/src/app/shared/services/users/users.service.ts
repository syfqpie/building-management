import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // URL
  public urlUsers: string = environment.baseUrl + 'v1/users/'

  // Data
  user: User
  users: User[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<User> {
    return this.http.post<any>(this.urlUsers, body).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUsers).pipe(
      tap((res) => {
        this.users = res
        // console.log('Users: ', this.users)
      })
    )
  }

  getOne(id: string): Observable<User> {
    let urlTemp = this.urlUsers + id + '/'
    return this.http.get<User>(urlTemp).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  activate(id: string): Observable<User> {
    let urlTemp = this.urlUsers + id + '/activate/'
    return this.http.get<User>(urlTemp).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  deactivate(id: string): Observable<User> {
    let urlTemp = this.urlUsers + id + '/deactivate/'
    return this.http.get<User>(urlTemp).pipe(
      tap((res) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

}
