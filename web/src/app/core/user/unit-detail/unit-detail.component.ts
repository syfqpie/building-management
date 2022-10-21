import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { ActivityType, UnitActivityNested } from 'src/app/shared/services/activity/activity.model';
import { UnitExtended } from 'src/app/shared/services/unit/unit.model';
import { UnitService } from 'src/app/shared/services/unit/unit.service';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {

  // Data
  currentUnit: UnitExtended | undefined
  currentTab: string = 'residents' // residents | bills
  activities: UnitActivityNested[] = []
  activityType = ActivityType

  // Checker
  isProcessing: boolean = false
  isAssigning: boolean = false

  // Subscription
  svcSubscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined
  eventSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private unitSvc: UnitService
  ) { }

  ngOnInit(): void {
    // Get id and data
    this.routeSubscription = this.route.paramMap.subscribe(
      (params) => {
        if (params.get('id')) {
          const id = Number(params.get('id'))
          this.getData(id)
        }
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
    // Unsubscribe route subscription
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    // Unsubscribe event subscription
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe()
    }
  }


  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(forkJoin([
      this.unitSvc.retrieveExtended(id),
      this.unitSvc.getUnitActivities(id)
    ]).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentUnit = this.unitSvc.unitExtended
        this.activities = this.unitSvc.unitActivites
      }
    }))
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(this.unitSvc.activate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
        
        this.notifySvc.success(
          'Success', 
          'Unit activated'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(this.unitSvc.deactivate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'Unit deactivated'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  enableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(this.unitSvc.enableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'Unit maintenance enabled'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  disableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.svcSubscription.add(this.unitSvc.disableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false

        this.notifySvc.success(
          'Success', 
          'Unit maintenance disabled'
        )
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  // Triggered when new owner assigned
  onOwnerChanged() {
    this.toggleAssignOwner()
    this.currentUnit = this.unitSvc.unitExtended
  }

  toggleAssignOwner() {
    this.isAssigning = !this.isAssigning
  }

  changeTab(tab: string) {
    this.currentTab = tab
  }

  viewMoreActivities() {
    return this.router.navigate(
      ['/management', 'units', 'activities'],
      { queryParams: 
        { id: this.currentUnit?.id! }
      }
    )
  }

}
