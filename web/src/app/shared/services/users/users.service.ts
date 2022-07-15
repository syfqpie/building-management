import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from './users.model';

const BASE_URL = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Data
  currentUser: User | undefined
  user: User | undefined
  users: User[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<User[]>(urlTemp).pipe(
      tap((res: User[]) => {
        this.users = res
        console.log('Users: ', this.users)
      })
    )
  }

  getOne(id: number): Observable<User> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<User>(urlTemp).pipe(
      tap((res: User) => {
        this.user = res
        console.log('User: ', this.user)
      })
    )
  }

  getAccountInfo(): Observable<User> {
    const urlTemp = `${ BASE_URL }get-account-info/`
    return this.http.get<User>(urlTemp).pipe(
      tap((res: User) => {
        this.currentUser = res
        // console.log('Current user: ', this.currentUser)
      })
    )
  }

  patchAccount(body: any, id: number): Observable<User> {
    const urlTemp = `${ BASE_URL }${id}/`
    return this.http.patch<User>(urlTemp, body).pipe(
      tap((res: User) => {
        this.currentUser = res
        // console.log('Current user: ', this.currentUser)
      })
    )
  }

}
