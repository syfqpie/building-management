import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Data
  returnUrl: string | null

  // Form
  loginForm: FormGroup
  loginFormMessages = {
    username: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password is too short. It must contain at least 8 character.' }
    ]
  }

  // Checker
  isProcessing: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('matgempak95@gmail.com', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('half2340', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  login() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.authSvc.login(this.loginForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success('Success', 'Successfully login')
      },
      (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        console.log('Failed', err)
        let errorMsg = ''
        errorMsg = err.error.nonFieldErrors[0]
        this.notifySvc.error('Error', errorMsg)
      },
      () => {
        this.router.navigate(['/dashboard'])
      }
    )
  }

}
