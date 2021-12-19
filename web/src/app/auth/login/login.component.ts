import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
// import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
// import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Data
  isRememberMe: boolean

  // Form
  loginForm: FormGroup

  // Subscriber
  subscription: Subscription

  // Image
  logo = '/assets/img/default/bums-logo.png'

  constructor(
    // private authService: AuthService,
    private fb: FormBuilder,
    // private loadingBar: LoadingBarService,
    // private notify: NotifyService,
    private router: Router
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
    this.loginForm = this.fb.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  login() {
    console.log(this.loginForm.value, this.isRememberMe)
    // this.loadingBar.useRef('http').start()
    // this.subscription = this.authService.obtainToken(this.loginForm.value).subscribe(
    //   () => {
    //     this.loadingBar.useRef('http').complete()
    //     this.notify.openToastrInfo('', 'Success')
    //   },
    //   (err) => {
    //     this.loadingBar.useRef('http').complete()
    //     this.notify.openToastrError('Error', err['detail'])
    //   },
    //   () => {
    //     this.navigatePage('/admin/dashboard')
    //   }
    // )
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

  cheat() {
    // this.loginForm.controls['username'].patchValue(this.cheatUsername)
    // this.loginForm.controls['password'].patchValue(this.cheatPwd)

    this.login()
  }

}
