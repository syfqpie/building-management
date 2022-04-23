import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';

@Component({
  selector: 'app-unit-numbers-table',
  templateUrl: './unit-numbers-table.component.html',
  styleUrls: ['./unit-numbers-table.component.scss']
})
export class UnitNumbersTableComponent implements OnInit, OnDestroy {

  // Data
  unitNumbers: UnitNumber[] = []

  // Checker
  isLoadingData: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private unitNumberSvc: UnitNumbersService
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

    this.subscription = this.unitNumberSvc.getAll().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.isLoadingData = false
      },
      () => {
        this.loadingBar.useRef('http').stop()
        this.isLoadingData = false
      },
      () => {
        this.unitNumbers = this.unitNumberSvc.unitNumbers
      }
    )
  }

}
