import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import PasswordValidation from 'src/app/shared/handlers/validators/password-match.validator';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit, OnDestroy {

  // Form
  changeForm: FormGroup = new FormGroup({
    newPassword1: new FormControl(null),
    newPassword2: new FormControl(null)
  })
  formMessages = {
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
    this.changeForm = this.fb.group({
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

  change() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = this.authSvc.changePassword(this.changeForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        
        this.notifySvc.success(
          'Success',
          'New password has been saved'
        )
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
      complete: () => { }
    })
  }

}
