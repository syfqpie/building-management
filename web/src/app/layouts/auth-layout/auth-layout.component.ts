import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

const PATH_PREFIX = '/auth/'
const DEF_IMG = 'assets/images/illustrations/building-town.png'
const RESEND_IMG = 'assets/images/illustrations/resend-verification.png'
const RESET_IMG = 'assets/images/illustrations/reset-password.png'
const REQUEST_IMG = 'assets/images/illustrations/request-reset-password.png'
const VERIFY_IMG = 'assets/images/illustrations/verify-account.png'

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  // Data
  currentImg: string = DEF_IMG

  // Subscription
  subscription: Subscription = new Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription.add(
      this.router.events
          .pipe(filter((event): event is NavigationEnd => 
            event instanceof NavigationEnd)
          )
          .subscribe((event) => {
            this.currentImg = this.routeImg(event)
          })
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) this.subscription.unsubscribe()
  }
  
  /**
   * Current route image selector
   * 
   * @param nav NavigationEnd
   * @returns route image path
   */
  routeImg(nav: NavigationEnd): string {
    if (nav.url.startsWith(`${ PATH_PREFIX }login`)) {
      return DEF_IMG
    } else if (nav.url.startsWith(`${ PATH_PREFIX }resend-verification`)) {
      return RESEND_IMG
    } else if (nav.url.startsWith(`${ PATH_PREFIX }reset`)) {
      // Get query parameters from URL
      const uid = this.route.snapshot.queryParamMap.get('uid')
      const token = this.route.snapshot.queryParamMap.get('key')

      if (uid && token) {
        return RESET_IMG
      } else {
        return REQUEST_IMG
      }
    } else if (nav.url.startsWith(`${ PATH_PREFIX }verify-account`)) {
      return VERIFY_IMG
    }

    return DEF_IMG
  }

}
