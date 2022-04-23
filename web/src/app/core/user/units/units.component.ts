import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

import { Unit } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnitsComponent implements OnInit, OnDestroy {

  // Data
  units: Unit[] = []

  // Checker
  isLoadingData: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private unitSvc: UnitsService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isLoadingData = true

    this.subscription = this.unitSvc.getAll().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.isLoadingData = false
      },
      () => {
        this.loadingBar.useRef('http').stop()
        this.isLoadingData = false
      },
      () => {
        this.units = this.unitSvc.units
      }
    )
  }

}
