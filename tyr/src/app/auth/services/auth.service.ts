import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoginResponse, LoginUser } from './auth.model';
import { TokenService } from 'src/app/core/token/token.service';

const BASE_URL = `${environment.baseUrl}auth/`

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private user = new BehaviorSubject<LoginUser | null>(null)
	private loginRes = new BehaviorSubject<LoginResponse | null>(null)
	private accessToken = new BehaviorSubject<string | null>(null)
	private refreshToken = new BehaviorSubject<string | null>(null)

	constructor(
		private http: HttpClient,
		private tokenSvc: TokenService
	) { }

	public login(body: object): Observable<LoginResponse> {
		const urlTemp = `${BASE_URL}login/`
		return this.http.post<LoginResponse>(urlTemp, body)
						.pipe(tap((res: LoginResponse) => {
							// Save response
							this.loginRes.next(res)
							this.user.next(res.user)
							this.accessToken.next(res.accessToken)
							this.refreshToken.next(res.refreshToken)

							// Save token to local storage
							this.tokenSvc.saveToken('accessToken', res.accessToken)
							this.tokenSvc.saveToken('refreshToken', res.refreshToken)
						})
		)
	}
}
