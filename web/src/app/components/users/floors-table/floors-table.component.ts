import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

import { Floor } from 'src/app/shared/services/floors/floors.model';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';

@Component({
  selector: 'app-floors-table',
  templateUrl: './floors-table.component.html',
  styleUrls: ['./floors-table.component.scss']
})
export class FloorsTableComponent implements OnInit, OnDestroy {

  // Data
  floors: Floor[] = []

  // Checker
  isLoadingData: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private floorSvc: FloorsService
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

    this.subscription = this.floorSvc.getAll().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.isLoadingData = false
      },
      () => {
        this.loadingBar.useRef('http').stop()
        this.isLoadingData = false
      },
      () => {
        this.floors = this.floorSvc.floors
      }
    )
  }

}
