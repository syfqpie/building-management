import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import PasswordValidation from 'src/app/shared/handlers/validators/password-match.validator';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  // Data
  key: string | null = null
  redirectTimeout: ReturnType<typeof setTimeout> | null = null

  // Form
  verifyForm: FormGroup = new FormGroup({
    key: new FormControl(null),
    newPassword1: new FormControl(null),
    newPassword2: new FormControl(null)
  })
  formMessages = {
    key: [
      { type: 'required', message: 'Key is required' }
    ],
    newPassword1: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must contain at least 8 character.' }
    ],
    newPassword2: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Password must contain at least 8 character.' },
      { type: 'matching', message: 'Passwords must match' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isVerified: boolean = false

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
    // Get query parameters from URL
    this.key = this.route.snapshot.queryParamMap.get('key')
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
    this.verifyForm = this.fb.group({
      key: new FormControl(this.key, Validators.compose([
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

  verify() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = this.authSvc.verifyAccount(this.verifyForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.isVerified = true
        
        this.notifySvc.success(
          'Your account has been verified',
          'You will be redirected to login page in 5 seconds'
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        this.isVerified = false
        
        let errorMsg = ''

        if (err.status !== 0) {
          if ('nonFieldErrors' in err.error) {
            errorMsg = err.error.nonFieldErrors[0]
          } else if ('detail' in err.error) {
            errorMsg = err.error.detail
          }
        }

        this.notifySvc.error('Error', errorMsg)
      },
      complete: () => {
        // Set timeout for redirection
        this.redirectTimeout = setTimeout(
          () => {
            this.router.navigate(['/auth/login'])
          }, 5000
        )
      }
    })
  }

}
