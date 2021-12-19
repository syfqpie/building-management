import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from './auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtService } from '../../handlers/jwt/jwt.service';
import { Router } from '@angular/router';

const baseUrl = `${ environment.baseUrl }auth/`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Data
  public token: TokenResponse
  public tokenAccess: string
  public tokenRefresh: string
  public email: string
  public userID: string
  public username: string
  public userType: string

  constructor(
    private http: HttpClient,
    private jwtSvc: JwtService,
    private router: Router
  ) { }

  register(body: any): Observable<any> {
    return this.http.post<any>(`${ baseUrl }registration/`, body).pipe(
      tap((res) => {
        // console.log('Registration: ', res)
      })
    )
  }

  changePassword(body: any): Observable<any> {
    return this.http.post<any>(`${ baseUrl }password/change/`, body).pipe(
      tap((res) => {
        // console.log('Change password: ', res)
      })
    )
  }

  resetPassword(body: any): Observable<any> {
    return this.http.post<any>(`${ baseUrl }password/reset/`, body).pipe(
      tap((res) => {
        // console.log('Reset password: ', res)
      })
    )
  }

  obtainToken(body: any): Observable<any> {
    const jwtHelper: JwtHelperService = new JwtHelperService()
    return this.http.post<any>(`${ baseUrl }password/obtain/`, body).pipe(
      tap((res) => {
        this.token = res
        this.tokenRefresh = res.refresh
        this.tokenAccess = res.access

        const decodedToken = jwtHelper.decodeToken(this.tokenAccess)
        this.email = decodedToken.email
        this.username = decodedToken.username
        this.userID = decodedToken.user_id
        this.userType = decodedToken.user_type
        this.jwtSvc.saveToken('accessToken', this.tokenAccess)
        this.jwtSvc.saveToken('refreshToken', this.tokenRefresh)
      })
    )
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.jwtSvc.getToken('refreshToken')
    const body = {
      refresh: refreshToken
    }
    return this.http.post<any>(`${ baseUrl }refresh/`, body).pipe(
      tap((res) => {
        // console.log('Token refresh: ', res)
      })
    )
  }

  verifyToken(body: any): Observable<any> {
    return this.http.post<any>(`${ baseUrl }verify/`, body).pipe(
      tap((res) => {
        // console.log('Token verify: ', res)
      })
    )
  }

  logout() {
    this.jwtSvc.destroyToken()
    return this.router.navigate(
      ['/auth/login'],
      { queryParams: { returnUrl: this.router.url }}
    )
  }

}
