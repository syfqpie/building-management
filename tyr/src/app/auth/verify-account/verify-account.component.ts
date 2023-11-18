import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';
import { AuthFormMessage } from '../auth.constant';
import PasswordValidation from 'src/app/shared/validators/password-match.validator';

@Component({
	selector: 'app-verify-account',
	templateUrl: './verify-account.component.html',
	styles: []
})
export class VerifyAccountComponent extends LoadableComponent implements OnInit, OnDestroy {

	key: string | null = null
	redirectTimeout: ReturnType<typeof setTimeout> | null = null
	subscription = new Subscription()
	hasVerified = false

	form: FormGroup = new FormGroup({
		key: new FormControl(null),
		newPassword1: new FormControl(null),
		newPassword2: new FormControl(null)
	})
	formMessages = {
		newPassword1: AuthFormMessage.password,
		newPassword2: AuthFormMessage.confirmPassword
	}

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
		this.key = this.route.snapshot.queryParamMap.get('key')
	}

	ngOnInit(): void {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(): void {
		this.form = this.fb.group({
			key: new FormControl(this.key, {
				validators: [Validators.required],
				updateOn: 'blur'
			}),
			newPassword1: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8)
				],
				updateOn: 'blur'
			}),
			newPassword2: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8),
					PasswordValidation.match('newPassword1', 'newPassword2')
				],
				updateOn: 'blur'
			})
		})
	}

	doPreVerify(): void {
		if (this.form.valid) this.verify()
	}

	private verify(): void {
		this.toggleLoader()
		this.subscription.add(this.authSvc.verifyAccount(this.form.value)
			.pipe(first())	
			.subscribe({
				next: () => {
					this.toggleLoader()
					this.hasVerified = true
				},
				error: (err: HttpErrorResponse) => {
					this.toggleLoader()
					this.hasVerified = false
					console.log('Error', err)
					// let errorMsg = ''

					// if (err.status !== 0) {
					// 	if ('nonFieldErrors' in err.error) {
					// 		errorMsg = err.error.nonFieldErrors[0]
					// 	} else if ('detail' in err.error) {
					// 		errorMsg = err.error.detail
					// 	}
					// }
				},
				complete: () => {
					// Set timeout for redirection
					this.redirectTimeout = setTimeout(
						() => {
							this.router.navigate(['/auth/login'])
						}, 5000
					)
				}
			}))
	}

}
