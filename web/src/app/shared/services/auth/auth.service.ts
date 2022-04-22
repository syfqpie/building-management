import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from '../../handlers/jwt/jwt.service';

import { LoginResponse, LoginUser } from './auth.model';

const BASE_URL = `${ environment.baseUrl }auth/`
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Data
  loginRes: LoginResponse
  user: LoginUser
  accessToken: string
  refreshToken: string

  constructor(
    private http: HttpClient,
    private jwtSvc: JwtService,
  ) { }

  login(body: any): Observable<LoginResponse> {
    const urlTemp = `${ BASE_URL }login/`
    console.log('url', urlTemp)
    return this.http.post<LoginResponse>(urlTemp, body).pipe(
      tap((res: LoginResponse) => {
        this.loginRes = res
        this.user = this.loginRes.user
        this.accessToken = res.accessToken
        this.refreshToken = res.refreshToken
        console.log('Login', this.loginRes)
        this.jwtSvc.saveToken('accessToken', this.accessToken)
        this.jwtSvc.saveToken('refreshToken', this.refreshToken)
      })
    )
  }

  logout() {}

  requestReset() {}

  confirmReset() {}

  changePassword() {}
  // login(body: any): Observable<LoginResponse> {
  //   const urlTemp = `${ environment.baseUrl }auth/login/`
  //   return this.http.post<LoginResponse>(urlTemp, body).pipe(
  //     tap((res: LoginResponse) => {
  //       this.loginRes = res
  //       this.user = this.loginRes.user
  //       this.accessToken = res.accessToken
  //       this.refreshToken = res.refreshToken
  //       // console.log('Login', this.loginRes)
  //       this.jwtSvc.saveToken('accessToken', this.accessToken)
  //       this.jwtSvc.saveToken('refreshToken', this.refreshToken)
  //     })
  //   )
  // }

}
