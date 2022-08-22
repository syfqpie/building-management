import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import PasswordValidation from 'src/app/shared/handlers/validators/password-match.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit, OnDestroy {

  // Data
  uid: string | null = null
  token: string | null = null
  redirectTimeout: ReturnType<typeof setTimeout> | null = null

  // Form
  requestForm: FormGroup = new FormGroup({
    email: new FormControl(null)
  })
  confirmForm: FormGroup = new FormGroup({
    uid: new FormControl(null),
    token: new FormControl(null),
    newPassword1: new FormControl(null),
    newPassword2: new FormControl(null)
  })
  formMessages = {
    email: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    uid: [
      { type: 'required', message: 'This field is required' }
    ],
    token: [
      { type: 'required', message: 'This field is required' }
    ],
    newPassword1: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must contain at least 8 character' }
    ],
    newPassword2: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Password must contain at least 8 character' },
      { type: 'matching', message: 'Passwords must match' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isConfirmReset: boolean = true
  isResetSubmitted: boolean = false
  isConfirmResetSubmitted: boolean = false

  // Subscriber
  subscription: Subscription = new Subscription

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService
  ) {
    // Get query parameters from URL
    this.uid = this.route.snapshot.queryParamMap.get('uid')
    this.token = this.route.snapshot.queryParamMap.get('key')

    // Set checker
    if (this.uid && this.token) {
      this.isConfirmReset = true
    } else {
      this.isConfirmReset = false
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    // To unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    // Clear timeout
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout)
    }
  }

  initForm() {
    this.requestForm = this.fb.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })

    this.confirmForm = this.fb.group({
      uid: new FormControl(this.uid, Validators.compose([
        Validators.required
      ])),
      token: new FormControl(this.token, Validators.compose([
        Validators.required
      ])),
      newPassword1: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      newPassword2: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    }, {
      validators: [PasswordValidation.match('newPassword1', 'newPassword2')]
    })
  }

  request() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    
    this.subscription.add(this.authSvc.requestReset(this.requestForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success('Success', 
          'Your password reset request has been submitted')
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
        // Set checker
        this.isResetSubmitted = true
      }
    }))
  }

  reset() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.authSvc.confirmReset(this.confirmForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success('Your account password has been reset',
          'You will be redirected to login page in 5 seconds')
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        let errorMsg = ''

        if (err.status !== 0) {
          if ('token' in err.error) {
            errorMsg = err.error.token[0] !== 'Invalid value' ? err.error.token[0] : 'Invalid token'
          } else if ('nonFieldErrors' in err.error) {
            errorMsg = err.error.nonFieldErrors[0]
          }
          
          this.notifySvc.error('Error', errorMsg)
        }
      },
      complete: () => {
        // Set checker
        this.isConfirmResetSubmitted = true

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
