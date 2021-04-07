import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Data
  units: UnitExtended[] = []

  // Form
  complaintForm: FormGroup

  // Subscriber
  subscription: Subscription

  constructor(
    private unitService: UnitsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.unitService.getAll().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.units = this.unitService.units
      }
    )
  }

  initForm() {
    this.complaintForm = this.fb.group({
      complainant: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      contact_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      unit: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      complaint: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  sendComplaint() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.unitService.create(this.complaintForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {}
    )
  }

}
