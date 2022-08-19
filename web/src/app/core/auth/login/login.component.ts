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
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  })
  formMessages = {
    username: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must contain at least 8 character' }
    ]
  }

  // Checker
  isProcessing: boolean = false

  // Subscriber
  subscription: Subscription | undefined

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
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
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

  login() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = this.authSvc.login(this.loginForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        
        this.notifySvc.success('Success', 'Successfully login')
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        if (err.status !== 0) {
          let errorMsg = ''
          errorMsg = err.error.nonFieldErrors[0]
          this.notifySvc.error('Error', errorMsg)
        }
      },
      complete: () => {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  onFormEnter() {
    if (this.loginForm.valid) {
      this.login()
    } else {
      // noop
    }
  }

}
