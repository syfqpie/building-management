import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Data
  cheatUsername = 'matgempak95@gmail.com'
  cheatPwd = 'test1234##'

  // Form
  loginForm: FormGroup

  // Subscriber
  subscription: Subscription

  // Image
  logo = '/assets/img/default/bums-logo.png'
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService,
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
      username: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  login() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.authService.obtainToken(this.loginForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrInfo('', 'Success')
      },
      (err) => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrError('Error', err['detail'])
      },
      () => {
        this.navigatePage('/admin/dashboard')
      }
    )
  }

  navigatePage(path) {
    return this.router.navigate([path])
  }

}
