import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from '../handlers/jwt/jwt.service';
import { NotifyService } from '../handlers/notify/notify.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtSvc: JwtService,
    private notify: NotifyService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  private handleError(error: HttpErrorResponse) {
    let data = {}
    data = {
      reason: error && error.error.reason ? error.error.reason : '',
      status: error.status
    }
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
        if (
          error.status === 401 &&
          error.error.code === 'token_not_valid'
          ) {
            this.notify.error('Session ended', 'Please try to login again')
            this.authSvc.logout()
          }
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }
    if (isDevMode()) {
      console.error('It happens: ', error);
    }

    return throwError(error)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers
    headers = headers.append('Accept', '*/*')

    const token = this.jwtSvc.getToken('accessToken');

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    // console.log('Intercepting...', headers)

    const request = req.clone({ headers });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('Event: ', event);
        }
        return event;
      }),
      catchError(this.handleError.bind(this))
    );
  }

}
