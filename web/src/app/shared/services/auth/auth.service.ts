import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { JwtService } from '../../handlers/jwt/jwt.service';

import { DetailResponse, LoginResponse, LoginUser } from './auth.model';

const BASE_URL = `${ environment.baseUrl }auth/`

/**
 * A service for Authentication related methods
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Data
  loginRes: LoginResponse | undefined
  user: LoginUser | null = null
  accessToken: string | undefined
  refreshToken: string | undefined

  constructor(
    private http: HttpClient,
    private jwtSvc: JwtService,
    private router: Router
  ) { }

  /**
   * Request to login
   * 
   * @param body - payload
   * @param body.username - account email
   * @param body.password - registered password
   *
   * @returns A login response (JWT) {@link LoginResponse}
   */
  login(body: any): Observable<LoginResponse> {
    const urlTemp = `${ BASE_URL }login/`
    return this.http.post<LoginResponse>(urlTemp, body).pipe(
      tap((res: LoginResponse) => {
        // Save response
        this.loginRes = res
        this.user = this.loginRes.user
        this.accessToken = res.accessToken
        this.refreshToken = res.refreshToken

        // Save token to local storage
        this.jwtSvc.saveToken('accessToken', this.accessToken)
        this.jwtSvc.saveToken('refreshToken', this.refreshToken)
      })
    )
  }

  /**
   * Logout of system
   * 
   * - Remove token from localStorage
   * - Reset user variable
   * - Navigate to login page
   *
   * @returns Nothing
   */
  logout() {
    // Remove all token in local storage
    this.jwtSvc.destroyToken()
    // Nullify user
    this.user = null
    // Navigate to login page
    this.router.navigate(
      ['/auth/login'],
      { queryParams: { returnUrl: this.router.url }}
    )
    return window.location.reload()
  }

  /**
   * Request reset password
   * 
   * An email will be sent to a registered account email
   * with instructions to reset password
   * 
   * @param body - payload
   * @param body.email - account email
   *
   * @returns A detail response {@link DetailResponse}
   */
  requestReset(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/reset/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Request reset', res)
      })
    )
  }

  /**
   * Confirm reset password
   * 
   * @param body - payload
   * @param body.uid - user ID
   * @param body.token - received token from email
   * @param body.newPassword1 - new password
   * @param body.newPassword2 - confirm new password
   *
   * @returns A detail response {@link DetailResponse}
   */
  confirmReset(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/reset/confirm/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Confirm reset', res)
      })
    )
  }

  /**
   * Change password
   * 
   * @param body - payload
   * @param body.newPassword1 - new password
   * @param body.newPassword2 - confirm new password
   *
   * @returns A detail response {@link DetailResponse}
   */
  changePassword(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/change/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Change password', res)
      })
    )
  }

  /**
   * Verify account
   * 
   * @param body - payload
   * @param body.key - received key from email
   * @param body.newPassword1 - new password
   * @param body.newPassword2 - confirm new password
   *
   * @returns A detail response {@link DetailResponse}
   */
  verifyAccount(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/verify-email/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Verify account', res)
      })
    )
  }

  /**
   * Resend verification email
   * 
   * @param body - payload
   * @param body.email - registered account email
   *
   * @returns A detail response {@link DetailResponse}
   */
  resendVerification(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/resend-verification/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Resend verification', res)
      })
    )
  }

  /**
   * Register admin
   * 
   * An email will be send to the registered email
   * with verification instruction
   * 
   * @param body - payload
   * @param body.username - user's email
   * @param body.fullName - user's full name
   * @param body.isSuperuser - is user superuser?
   *
   * @returns A detail response {@link DetailResponse}
   */
  registerAdmin(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/admin/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Register admin', res)
      })
    )
  }

  /**
   * Register resident
   * 
   * An email will be send to the registered email
   * with verification instruction
   * 
   * @param body - payload
   * @param body.username - user's email
   * @param body.name - user's full name
   * @param body.title - user's title
   * @param body.gender - user's gender
   * @param body.phoneNo - user's phone no.
   * @param body.nric - user's NRIC
   *
   * @returns A detail response {@link DetailResponse}
   */
  registerResident(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/resident/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Register resident', res)
      })
    )
  }

}
