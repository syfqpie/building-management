import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from '../../handlers/jwt/jwt.service';

import { DetailResponse, LoginResponse, LoginUser } from './auth.model';

const BASE_URL = `${ environment.baseUrl }auth/`

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

  requestReset(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/reset/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Request reset', res)
      })
    )
  }

  confirmReset(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/reset/confirm/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Confirm reset', res)
      })
    )
  }

  changePassword(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }password/change/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Change password', res)
      })
    )
  }

  verifyAccount(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/verify-email-renter/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Verify account', res)
      })
    )
  }

  resendVerification(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/resend-verification/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Resend verification', res)
      })
    )
  }

  registerAdmin(body: any): Observable<DetailResponse> {
    const urlTemp = `${ BASE_URL }registration/admin/`
    return this.http.post<DetailResponse>(urlTemp, body).pipe(
      tap((res: DetailResponse) => {
        // console.log('Resend verification', res)
      })
    )
  }

}
