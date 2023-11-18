import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styles: []
})
export class ResetComponent {
	uid: string | null = null
	token: string | null = null
	isRequest = true

	constructor(
		private route: ActivatedRoute
	) {
		// Get query parameters from URL
		this.uid = this.route.snapshot.queryParamMap.get('uid')
		this.token = this.route.snapshot.queryParamMap.get('key')

		// Set checker
		if (this.uid && this.token) {
			this.isRequest = false
		} else {
			this.isRequest = true
		}
	}
}
