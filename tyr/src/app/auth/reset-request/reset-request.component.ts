import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AuthFormMessage } from '../auth.constant';

@Component({
	selector: 'app-reset-request',
	templateUrl: './reset-request.component.html',
	styles: []
})
export class ResetRequestComponent extends LoadableComponent implements OnInit, OnDestroy {
	form: FormGroup = new FormGroup({
		email: new FormControl(null)
	})
	formMessages = { email: AuthFormMessage.email }

	isSubmitted = false
	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
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
			email: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.email
				],
				updateOn: 'blur'
			})
		})
	}

	private request(): void {
		this.toggleLoader()
		this.subscription.add(this.authSvc.requestReset(this.form.value).subscribe({
			next: () => {
				this.toggleLoader()
			},
			error: (err) => {
				this.toggleLoader()
				console.log('Error', err)
			},
			complete: () => {
				this.isSubmitted = true
			}
		}))
	}

	doPreRequest(): void {
		if (this.form.valid) this.request()
	}
}
