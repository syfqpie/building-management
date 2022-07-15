import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { JwtService } from 'src/app/shared/handlers/jwt/jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../services/users/users.model';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<User> {

  constructor(
    private userSvc: UsersService,
    private jwtSvc: JwtService,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    // Return resolver
    return this.userSvc.getAccountInfo().pipe(
      catchError(() => {
        // Redirect
        this.router.navigate(['/auth/login'])

        // Remove all token in local storage
        // this.jwtSvc.destroyToken()
        return EMPTY
      })
    )
  }
}
