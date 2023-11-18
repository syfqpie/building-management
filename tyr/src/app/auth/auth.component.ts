import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

const PATH_PREFIX = '/auth/'
const DEF_IMG = 'assets/images/illustrations/building-town.png'
const RESEND_IMG = 'assets/images/illustrations/resend-verification.png'
const RESET_IMG = 'assets/images/illustrations/reset-password.png'
const REQUEST_IMG = 'assets/images/illustrations/request-reset-password.png'
const VERIFY_IMG = 'assets/images/illustrations/verify-account.png'

@Component({
	selector: 'app-auth',
	template: `
    <div class="container-fluid bg-dark vh-100">
		<div class="row h-100">
			<div
				class="col-sm-12 col-md-4 d-flex bg-white flex-column
				align-items-center justify-content-center">
				<img
					alt=""
					[src]="currentImg"
					class="w-100 d-block d-md-none" />
				<img
					alt=""
					class="mx-auto d-none d-md-block mb-3"
					src="assets/images/default/logo-primary.png"
					style="height: 5rem; width: 5rem" />

				<router-outlet></router-outlet>
			</div>

			<div
				class="col-md-8 d-md-flex align-items-center
				justify-content-center d-none">
				<img
					alt=""
					[src]="currentImg"
					style="height: 25rem;" />
			</div>
		</div>
	</div>
  `,
	styles: [
	]
})
export class AuthComponent implements OnDestroy {
	currentImg: string = DEF_IMG

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
