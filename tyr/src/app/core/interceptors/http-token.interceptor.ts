import { Injectable, isDevMode } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpStatusCode,
	HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import { AuthService } from '../services/auth/auth.service';
import { HttpErrorCode, HttpErrorDetail, HttpHeaderConfig, HttpMethod } from '../../shared/constants/http.constant';

import { TokenService } from '../token/token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private tokenSvc: TokenService
	) { }

	/**
	 * Intercept requests
	 * 
	 * @param req http request
	 * @param next http handler
	 * @returns a http handler
	 */
	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// Get token
		const token = this.tokenSvc.getToken('accessToken')

		// Append token if available
		if (token) {
			req = this.appendHeader(req, token)
		}

		return next.handle(req).pipe(
			map((event: HttpEvent<unknown>) => {
				if (event instanceof HttpResponse) {
					// console.log('Event: ', event);
				}
				return event;
			}),
			catchError(this.handleError.bind(this))
		)
	}

	/**
   * Append token to request
   * 
   * @param req http request
   * @param token saved token
   * @returns updated request
   */
	private appendHeader(req: HttpRequest<unknown>, token: string) {
		const headers = new HttpHeaders()

		headers.append(HttpHeaderConfig.ACCEPT, HttpHeaderConfig.ACCEPT_VALUE)
		headers.append(HttpHeaderConfig.AUTHORIZATION, `${HttpHeaderConfig.TOKEN_PREFIX} ${token}`)

		// Append content type to header if method is POST or PUT or PATCH only
		if (
			req.method === HttpMethod.POST ||
			req.method === HttpMethod.PUT ||
			req.method === HttpMethod.PATCH
		) {
			headers.append(HttpHeaderConfig.CONTENT_TYPE, HttpHeaderConfig.CONTENT_TYPE_JSON)
		}

		return req.clone({
			headers: headers
		})
	}

	/**
	 * Error handling
	 * 
	 * Customised error handling here
	 * 
	 * @param error http error
	 * @returns HttpErrorResponse
	 */
	private handleError(error: HttpErrorResponse) {
		if (!navigator.onLine) {
			// Server or connection error happened
		} else {
			if (error instanceof HttpErrorResponse) {
				// Handle Http Error ie: error.status === 403, 404...
				if (
					error.status === HttpStatusCode.Unauthorized &&
					error.error.code === HttpErrorCode.TOKEN_NOT_VALID
				) {
					// token not valid: wrong token or expired
					// show toastr and logout
					// this.notify.error('Session ended', 'Please try to login again')
					// this.authSvc.logout()
				}

				if (
					error.status === HttpStatusCode.Forbidden &&
					error.error?.detail === HttpErrorDetail.NO_PERMISSION
				) {
					// user has no permission to access API
					// navigated not not-authorized page
					this.router.navigate(['/not-authorized'])
				}
			} else {
				// Handle Client Error
				// ie: Angular Error, ReferenceError...
			}
		}

		if (isDevMode()) {
			// Debugging...
			console.error('It happens: ', error);
		}

		return throwError(() => error)
	}
}
