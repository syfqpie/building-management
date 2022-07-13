import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  // Data
  currentTab: string = 'details' // details | password

  // Form
  informationForm: FormGroup = new FormGroup({
    fullName: new FormControl(null)
  })
  informationFormMessages = {
    fullName: [
      { type: 'required', message: 'Email address is required' },
      { type: 'minlength', message: 'Password is too short. It must contain at least 5 character.' }
    ]
  }
  changeForm: FormGroup = new FormGroup({
    password1: new FormControl(null),
    password2: new FormControl(null)
  })
  changeFormMessages = {
    password1: [
      { type: 'required', message: 'Email address is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    password2: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password is too short. It must contain at least 8 character.' }
    ]
  }

  // Checker
  isProcessing: boolean = false

  // Subscriber
  subscription: Subscription | undefined

  constructor(
    private fb: FormBuilder
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
    this.changeForm = this.fb.group({
      password1: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      password2: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })

    this.informationForm = this.fb.group({
      fullName: new FormControl('John Doe', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })
  }

  changeTab(tab: string) {
    this.currentTab = tab
  }

}
