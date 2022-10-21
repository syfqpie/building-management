import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../jwt/jwt.service';
import { NotifyService } from '../notify/notify.service';

/**
 * AuthGuard provides accessibility control to a route
 * based on accessToken saved.
 * 
 * Saved token will be decoded to get the userType of
 * a user and match with the roles data in a route.
 * 
 * If not matched, user will be redirected to dashboard
 * and a toastr will be shown.
 * 
 * If no token found or token is expired, user will be
 * redirected to login page.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private jwtSvc: JwtService,
    private notify: NotifyService,
    private authSvc: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authSvc.user
      const token = this.jwtSvc.getToken('accessToken')

      if (token) {
        // decode token to get user type
        const helper = new JwtHelperService()
        const decodedToken = helper.decodeToken(token)

        // check if route is restricted by role
        if (route.data['roles'] && route.data['roles'].indexOf(decodedToken.userType) === -1) {
          // role not authorised so redirect to home page
          return this.notAuthorizedUser(state)
        }

        // authorised so return true
        return true;
      }

      // not logged in so redirect to login page with the return url
      return this.notAuthorized(state)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  /**
   * Not authorized is triggered when a saved token is expired
   * or not found in localStorage. User will be directed to
   * login page.
   */
  notAuthorized(state: RouterStateSnapshot) {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false
  }

  /**
   * Not authorized user will be redirected to 
   * dashboard page and a toastr will be shown.
   */
  notAuthorizedUser(state: RouterStateSnapshot) {
    this.notify.warning('Not authorized', 'You don\'t have permission to access this page')
    this.router.navigate(['/dashboard']);
    return false
  }

}
