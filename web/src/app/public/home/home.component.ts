import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { ComplaintsService } from 'src/app/shared/services/complaints/complaints.service';
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

  // Image
  imgDashboard = '/assets/img/presentation/dashboard.png'

  // Auto scroll
  isShowAutoScroll: boolean;
  topPosToStartShowing = 100;

  constructor(
    private unitService: UnitsService,
    private complaintService: ComplaintsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService,
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
    this.subscription = this.complaintService.create(this.complaintForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrInfo('Success', 'Your complaint has been sent')
      },
      () => {
        this.loadingBar.useRef('http').complete()
        this.notify.openToastrError('Error', 'Please try again later')
      },
      () => {}
    )
  }

  @HostListener('window:scroll')
  checkToScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShowAutoScroll = true;
    } else {
      this.isShowAutoScroll = false;
    }
  }

  goTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
