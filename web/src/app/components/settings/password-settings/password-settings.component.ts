import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import PasswordValidation from 'src/app/shared/handlers/validators/password-match.validator';

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
  subscription: Subscription = new Subscription

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

  /**
   * Initialize form with current data
   * and validators
   */
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

  /**
   * Trigger http request to apply
   * changes
   */
  change() {
    // For loading status
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      this.authSvc.changePassword(this.changeForm.value)
          .subscribe({
            next: () => {
              // Update loading status and show toastr
              this.loadingBar.useRef('http').complete()
              this.isProcessing = false
              this.notifySvc.success(
                'Success',
                'New password has been saved'
              )
            },
            error: (err) => {
              // Update loading status
              this.loadingBar.useRef('http').stop()
              this.isProcessing = false
              
              let errorMsg = ''
              
              // Get error message from response
              if (err.status !== 0) {
                if ('nonFieldErrors' in err.error) {
                  errorMsg = err.error.nonFieldErrors[0]
                } else if ('detail' in err.error) {
                  errorMsg = err.error.detail
                }
              }
              
              // Show toastr
              this.notifySvc.error('Error', errorMsg)
            },
            complete: () => { }
          }))
  }

}
