import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {

  // Data
  currentUnit: Unit | undefined

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription | undefined
  activateSubscription: Subscription | undefined
  deactivateSubscription: Subscription | undefined
  enableMaintenanceSubscription: Subscription | undefined
  disableMaintenanceSubscription: Subscription | undefined
  routeSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private unitSvc: UnitsService
  ) { }

  ngOnInit(): void {
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
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    if (this.activateSubscription) {
      this.activateSubscription.unsubscribe()
    }
    if (this.deactivateSubscription) {
      this.deactivateSubscription.unsubscribe()
    }
    if (this.enableMaintenanceSubscription) {
      this.enableMaintenanceSubscription.unsubscribe()
    }
    if (this.disableMaintenanceSubscription) {
      this.disableMaintenanceSubscription.unsubscribe()
    }
  }


  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.unitSvc.getOne(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentUnit = this.unitSvc.unit
      }
    })
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.activateSubscription = this.unitSvc.activate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    })
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.deactivateSubscription = this.unitSvc.deactivate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    })
  }

  enableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.enableMaintenanceSubscription = this.unitSvc.enableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    })
  }

  disableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.disableMaintenanceSubscription = this.unitSvc.disableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    })
  }

}
