import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import { GenderType, TitleType } from 'src/app/shared/services/renters/renters.model';

@Component({
  selector: 'app-renter-registration',
  templateUrl: './renter-registration.component.html',
  styleUrls: ['./renter-registration.component.scss']
})
export class RenterRegistrationComponent implements OnInit, OnDestroy {

  // Data
  genderType = GenderType
  titleType = TitleType
  
  // Form
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    name: new FormControl(null),
    title: new FormControl(null),
    gender: new FormControl(null),
    phoneNumber: new FormControl(null),
    nric: new FormControl(null)
  })
  registerFormMessages = {
    username: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    name: [
      { type: 'required', message: 'Full name is required' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Field is required' }
    ],
    nric: [
      { type: 'required', message: 'Field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isModalOpen: boolean = false

  // Subscription
  subscription: Subscription | undefined

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
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      title: new FormControl(null),
      gender: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      nric: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  registerRenter() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.authSvc.registerRenter(this.registerForm.value).subscribe({
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
    })
  }

  toggleModal() {
    return this.isModalOpen = !this.isModalOpen
  }

}
