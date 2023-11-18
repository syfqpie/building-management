import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent extends LoadableComponent implements OnInit {
	returnUrl: string | null = null

	form: FormGroup = new FormGroup({
		username: new FormControl(null),
		password: new FormControl(null)
	})

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
		this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
	}

	ngOnInit(): void {
		this.initForm()
		console.log('Login initialized', this.isLoading)
	}

	private initForm(): void {
		this.form = this.fb.group({
			username: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.email
			])),
			password: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.minLength(8)
			]))
		})
	}

	private login(): void {
		this.isLoading = true
		this.authSvc.login(this.form.value)
					.pipe(first())
					.subscribe({
						next: () => {
							this.isLoading = false
						},
						error: (err: HttpErrorResponse) => {
							this.isLoading = false
							console.log(err)
						},
						complete: () => {
							console.log('complete')
							// this.router.navigate(['/dashboard'])
						}
					})
	}
	
	doPreLogin(): void {
		if (this.form.valid) this.login()
	}
}
