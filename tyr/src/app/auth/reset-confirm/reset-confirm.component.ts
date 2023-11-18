import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthFormMessage } from '../auth.constant';
import { AuthService } from '../services/auth.service';
import PasswordValidation from 'src/app/shared/validators/password-match.validator';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reset-confirm',
	templateUrl: './reset-confirm.component.html',
	styles: []
})
export class ResetConfirmComponent extends LoadableComponent implements OnInit, OnDestroy {
	@Input() uid: string | null = null
	@Input() token: string | null = null

	form: FormGroup = new FormGroup({
		uid: new FormControl(null),
		token: new FormControl(null),
		newPassword1: new FormControl(null),
		newPassword2: new FormControl(null)
	})
	formMessages = {
		uid: AuthFormMessage.uid,
		token: AuthFormMessage.token,
		newPassword1: AuthFormMessage.password,
		newPassword2: AuthFormMessage.confirmPassword
	}

	isResetCompleted = false
	redirectTimeout: ReturnType<typeof setTimeout> | null = null
	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authSvc: AuthService
	) { super() }

	ngOnInit(): void {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(): void {
		this.form = this.fb.group({
			uid: new FormControl(this.uid, {
				validators: [Validators.required]
			}),
			token: new FormControl(this.token, {
				validators: [Validators.required]
			}),
			newPassword1: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8)
				]
			}),
			newPassword2: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8),
					PasswordValidation.match('newPassword1', 'newPassword2')
				]
			})
		})
	}

	private reset(): void {
		this.toggleLoader()

		this.subscription.add(this.authSvc.confirmReset(this.form.value).subscribe({
			next: () => {
				this.toggleLoader()
			},
			error: (err: HttpErrorResponse) => {
				this.toggleLoader()
				console.log('Error', err)
			},
			complete: () => {
				// Set checker
				this.isResetCompleted = true

				// Set timeout for redirection
				this.redirectTimeout = setTimeout(
					() => {
						this.router.navigate(['/auth/login'])
					}, 5000
				)
			}
		}))
	}

	doPreReset(): void {
		if (this.form.valid) this.reset()
	}

}
