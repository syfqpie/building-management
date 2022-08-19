import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.scss']
})
export class ResendVerificationComponent implements OnInit, OnDestroy {

  // Form
  resendForm: FormGroup = new FormGroup({
    email: new FormControl(null)
  })
  formMessages = {
    email: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
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
    private authSvc: AuthService
  ) { }

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
    this.resendForm = this.fb.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }

  resend() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = this.authSvc.resendVerification(this.resendForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        
        this.notifySvc.success('Success', 'Verification e-mail sent')
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
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
      complete: () => {}
    })
  }

}
