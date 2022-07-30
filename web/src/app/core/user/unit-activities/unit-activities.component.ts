import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { ActivityType, UnitActivity } from 'src/app/shared/services/activities/activities.model';
import { ActivitiesService } from 'src/app/shared/services/activities/activities.service';

@Component({
  selector: 'app-unit-activities',
  templateUrl: './unit-activities.component.html',
  styleUrls: ['./unit-activities.component.scss']
})
export class UnitActivitiesComponent implements OnInit, OnDestroy {

  // Data
  activities: UnitActivity[] = []
  searchId: number[] = []
  activityType = ActivityType
  
  // Table
  tableRows: UnitActivity[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of activities'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left small',
    pagerRightArrow: 'fa-solid fa-angle-right small',
    pagerPrevious: 'fa-solid fa-angles-left small',
    pagerNext: 'fa-solid fa-angles-right small'
  }

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription | undefined
  routeSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private activitySvc: ActivitiesService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(
      (params) => {
        if (params['id']) {
          this.searchId.push(params['id'])
        }
      }
    )

    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    // Unsubscribe
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.activitySvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.activities = this.activitySvc.activities
        this.tableRows = [...this.activities]
      }
    })
  }

}
