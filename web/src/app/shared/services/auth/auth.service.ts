import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Data

  constructor(
    private http: HttpClient
  ) { }

  login() {}

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
