import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  // Data

  // Form
  resetForm: FormGroup

  // Subscriber
  subscription: Subscription

  // Image
  logo = '/assets/img/default/bums-logo.png'
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.resetForm = this.fb.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }

  reset() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.authService.resetPassword(this.resetForm.value).subscribe(
      () => {},
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      }
    )
  }

}
