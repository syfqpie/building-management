import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthFormMessage } from '../auth.constant';
import { AuthService } from '../services/auth.service';
import { LoadableComponent } from 'src/app/shared/models/base.model';
import { DetailResponse } from '../services/auth.model';

@Component({
	selector: 'app-resend-verification',
	templateUrl: './resend-verification.component.html',
	styles: []
})
export class ResendVerificationComponent extends LoadableComponent implements OnInit, OnDestroy {
	form: FormGroup = new FormGroup({
		email: new FormControl(null)
	})
	formMessages = {
		email: AuthFormMessage.email
	}

	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private authSvc: AuthService
	) {
		super()
	}

	ngOnInit(): void {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(): void {
		this.form = this.fb.group({
			email: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.email
				],
				updateOn: 'blur'
			})
		})
	}

	private resend(): void {
		this.toggleLoader()
		this.subscription = this.authSvc.resendVerification(this.form.value).subscribe({
			next: () => {
				this.toggleLoader()
			},
			error: (err: DetailResponse) => {
				this.toggleLoader()
				console.log(err)
			}
		})
	}

	doPreResend(): void {
		if (this.form.valid) this.resend()
	}
}
