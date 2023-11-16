import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

@Component({
  selector: 'app-sys-register-admin',
  templateUrl: './sys-register-admin.component.html',
  styleUrls: ['./sys-register-admin.component.scss'],
  providers: [
    FormBuilder
  ]
})
export class SysRegisterAdminComponent implements OnInit, OnDestroy {

  // Form
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    fullName: new FormControl(null),
    isStaff: new FormControl(null),
    isSuperuser: new FormControl(null)
  })
  formMessages = {
    username: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    fullName: [
      { type: 'required', message: 'Full name is required' }
    ],
    isSuperuser: [
      { type: 'required', message: 'Field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription = new Subscription

  // Event
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()

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
    this.registerForm = this.fb.group({
      username: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      fullName: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      isStaff: new FormControl({ value: true, disabled: true }, Validators.compose([
        Validators.required
      ])),
      isSuperuser: new FormControl(false, Validators.compose([
        Validators.required
      ]))
    })
  }

  registerAdmin() {
    // For loading status
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      this.authSvc.registerAdmin(this.registerForm.value)
          .subscribe({
            next: () => {
              // Update loading status and show toastr
              this.loadingBar.useRef('http').complete()
              this.isProcessing = false
              this.notifySvc.success(
                'Success', 
                `A verification has been sent to \
                ${this.registerForm.value.username}`
              )
            },
            error: (err) => {
              // Update loading status
              this.loadingBar.useRef('http').stop()
              this.isProcessing = false
              
              // Get error message and show toastr
              let errorTitle = 'Error'
              let errorMsg = ''
              if (err.status !== 0) {
                if (err.status === 404) {
                  errorTitle = String(err.status)
                  errorMsg = 'Not found'
                } else if ('nonFieldErrors' in err.error) {
                  errorMsg = err.error.nonFieldErrors[0]
                } else if ('username' in err.error) {
                  errorMsg = err.error.username[0]
                }
              }
              this.notifySvc.error(errorTitle, errorMsg)
            },
            complete: () => {
              this.registerForm.reset()
              this.initForm()
              this.toggleModal()
              this.changedEvent.emit(true)
            }
          }))
  }

  toggleModal() {
    return this.isModalOpen = !this.isModalOpen
  }

}
