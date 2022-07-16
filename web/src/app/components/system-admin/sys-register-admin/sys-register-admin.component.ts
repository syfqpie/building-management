import { Component, OnDestroy, OnInit } from '@angular/core';
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
  registerFormMessages = {
    username: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    fullName: [
      { type: 'required', message: 'Full name is required' }
    ],
    isSuperuser: [
      { type: 'required', message: 'Tfield is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription | undefined

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    console.log('onInit SysRegAdmin')
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

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
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.authSvc.registerAdmin(this.registerForm.value).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success(
          'Success', 
          `A verification has been sent to ${this.registerForm.value.username}`
        )
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        let errorTitle = 'Error'
        let errorMsg = ''
        if (err.status !== 0) {
          if (err.status === 404) {
            errorTitle = String(err.status)
            errorMsg = 'Not found'
          } else if ('nonFieldErrors' in err.error) {
            errorMsg = err.error.nonFieldErrors[0]
          } 
        }
        this.notifySvc.error(errorTitle, errorMsg)
      },
      complete: () => {
        this.registerForm.reset()
      }
    })
  }

  toggleModal() {
    return this.isModalOpen = !this.isModalOpen
  }

}
