import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  // Data
  accountInfo: User | undefined

  // Form
  informationForm: FormGroup = new FormGroup({
    fullName: new FormControl(null)
  })
  informationFormMessages = {
    fullName: [
      { type: 'required', message: 'Full name is required' },
      { type: 'minlength', message: 'Must contain at least 3 character' },
      { type: 'pattern', message: 'Must contain valid character' }
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
    private userSvc: UsersService
  ) { }

  ngOnInit(): void {
    this.accountInfo = this.userSvc.currentUser
    this.initForm()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.informationForm = this.fb.group({
      fullName: new FormControl(this.accountInfo?.fullName, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z ,.'-]+$/i)
      ]))
    })
  }

  submitChange() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.userSvc.patchAccount(this.informationForm.value, this.accountInfo?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        this.notifySvc.success('Success', 'Information updated')
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
        
        let errorMsg = ''
        
        if (err.status !== 0) {
          if ('nonFieldErrors' in err.error) {
            errorMsg = err.error.nonFieldErrors[0]
          }
        }

        this.notifySvc.error('Error', errorMsg)
      },
      complete: () => {}
    })
  }

}
