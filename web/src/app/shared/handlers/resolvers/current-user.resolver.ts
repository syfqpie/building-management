import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { User } from '../../services/user/user.model';
import { UserService } from '../../services/user/user.service';

/**
 * A current user resolver
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<User> {

  constructor(
    private userSvc: UserService,
    private router: Router
  ){}

  /**
   * Resolve
   * 
   * Will invoke a API call to get account information.
   * If return 403, will navigate user to login page.
   */
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
