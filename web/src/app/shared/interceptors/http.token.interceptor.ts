import { Injectable, isDevMode } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';
import { HttpErrorCode, HttpErrorDetail, HttpHeaderConfig, HttpMethod  } from './http.error';

import { JwtService } from '../handlers/jwt/jwt.service';
import { NotifyService } from '../handlers/notify/notify.service';

/**
 * Intercepts a HTTP request to append header with bearer token.
 * 
 * Edit this class to add more error handling.
 */
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtSvc: JwtService,
    private notify: NotifyService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  /**
   * Intercept requests
   * 
   * @param req http request
   * @param next http handler
   * @returns a http handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const token = this.jwtSvc.getToken('accessToken')

    // Append token if available
    if (token) {
      req = this.appendHeader(req, token)
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
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
  private appendHeader(req: HttpRequest<any>, token: string) {
    let headerConfig: any = {
      'accept': HttpHeaderConfig.ACCEPT_VALUE,
      'Authorization': `${HttpHeaderConfig.TOKEN_PREFIX} ${token}`
    }

    // Append content type to header if 
    // method is POST or PUT or PATCH
    if (
      req.method === HttpMethod.POST || 
      req.method === HttpMethod.PUT || 
      req.method === HttpMethod.PATCH
    ) {
      headerConfig[HttpHeaderConfig.CONTENT_TYPE] = HttpHeaderConfig.CONTENT_TYPE_JSON
    }

    return req.clone({
      setHeaders: headerConfig
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
      // Handle offline error
      this.notify.info('Info', 'No internet connection')
    } else {
      if (error instanceof HttpErrorResponse) {
        // Handle Http Error
        // ie: error.status === 403, 404...
        if (
          error.status === HttpStatusCode.Unauthorized &&
          error.error.code === HttpErrorCode.TOKEN_NOT_VALID
        ) {
          // token not valid: wrong token or expired
          // show toastr and logout
          this.notify.error('Session ended', 'Please try to login again')
          this.authSvc.logout()
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
