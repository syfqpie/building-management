import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { DetailResponse, LoginResponse, LoginUser } from './auth.model';
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

	/**
	 * Request to login
	 * 
	 * @param body - payload
	 * @param body.username - account email
	 * @param body.password - registered password
	 *
	 * @returns A login response (JWT) {@link LoginResponse}
	 */
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
			}))
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
	public verifyAccount(body: object): Observable<DetailResponse> {
		const urlTemp = `${BASE_URL}registration/verify-email/`
		return this.http.post<DetailResponse>(urlTemp, body).pipe(
			tap(() => {
				// noop
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
	resendVerification(body: object): Observable<DetailResponse> {
		const urlTemp = `${BASE_URL}registration/resend-verification/`
		return this.http.post<DetailResponse>(urlTemp, body).pipe(
			tap(() => {
				// noop
			})
		)
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
	requestReset(body: object): Observable<DetailResponse> {
		const urlTemp = `${BASE_URL}password/reset/`
		return this.http.post<DetailResponse>(urlTemp, body).pipe(
			tap(() => {
				// noop
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
	confirmReset(body: object): Observable<DetailResponse> {
		const urlTemp = `${BASE_URL}password/reset/confirm/`
		return this.http.post<DetailResponse>(urlTemp, body).pipe(
			tap(() => {
				// noop
			})
		)
	}
}
