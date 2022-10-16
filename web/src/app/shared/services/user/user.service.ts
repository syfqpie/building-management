import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User, EmailVerification, UserEmail } from './user.model';

const BASE_URL = `${ environment.baseUrl }v1/users/`

/**
 * A service for User related methods
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Data
  currentUser: User | undefined
  user: User | undefined
  users: User[] = []
  usersChoice: UserEmail[] = []
  emailVerifications: EmailVerification[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Returns a list of users
   *
   * @returns List of users
   */
  list(): Observable<User[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<User[]>(urlTemp).pipe(
      tap((res: User[]) => {
        this.users = res
        // console.log('Users: ', this.users)
      })
    )
  }

  /**
   * Returns a user
   * 
   * @param id - user ID
   *
   * @returns A user
   */
  retrieve(id: number): Observable<User> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<User>(urlTemp).pipe(
      tap((res: User) => {
        this.user = res
        // console.log('User: ', this.user)
      })
    )
  }

  /**
   * Returns the current user information
   *
   * @returns Current user
   */
  getAccountInfo(): Observable<User> {
    const urlTemp = `${ BASE_URL }get-account-info/`
    return this.http.get<User>(urlTemp).pipe(
      tap((res: User) => {
        this.currentUser = res
        // console.log('Current user: ', this.currentUser)
      })
    )
  }

  /**
   * Partial update a user
   *
   * @param id - user ID
   * @param body - payload
   * @param body.fullName - user's full name
   * 
   * @returns Updated user
   */
  patchAccount(body: any, id: number): Observable<User> {
    const urlTemp = `${ BASE_URL }${id}/`
    return this.http.patch<User>(urlTemp, body).pipe(
      tap((res: User) => {
        this.currentUser = res
        // console.log('Current user: ', this.currentUser)
      })
    )
  }

  /**
   * Returns a list of users with verifications status
   *
   * @returns List of users
   */
  getAllVerification(): Observable<EmailVerification[]> {
    const urlTemp = `${ BASE_URL }get-users-verification/`
    return this.http.get<EmailVerification[]>(urlTemp).pipe(
      tap((res: EmailVerification[]) => {
        this.emailVerifications = res
        // console.log('Users: ', this.emailVerifications)
      })
    )
  }

  /**
   * Filter users through:
   * - userType
   * - isActive
   * 
   * @param filterStr - string filter
   *
   * @returns List of filtered users
   */
  filterSimplified(filterStr?: string): Observable<UserEmail[]> {
    const qStr = filterStr ? `?${filterStr}` : ''
    const urlTemp = `${ BASE_URL }get-simplified/${ qStr }`
    return this.http.get<UserEmail[]>(urlTemp).pipe(
      tap((res: UserEmail[]) => {
        this.usersChoice = res
        // console.log('Users: ', this.usersChoice)
      })
    )
  }

}
