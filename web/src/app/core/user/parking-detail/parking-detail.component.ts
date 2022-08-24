import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { ParkingExtended } from 'src/app/shared/services/parkings/parkings.model';
import { ParkingsService } from 'src/app/shared/services/parkings/parkings.service';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.scss']
})
export class ParkingDetailComponent implements OnInit {

  // Data
  currentParking: ParkingExtended | undefined

  // Checker
  isProcessing: boolean = false
  isAssigning: boolean = false

  // Subscription
  subscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private parkingSvc: ParkingsService
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
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.parkingSvc.getOneExtended(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentParking = this.parkingSvc.parkingExtended
      }
    }))
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.parkingSvc.activate(this.currentParking?.id!).subscribe({
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
        this.getData(this.currentParking?.id!)
      }
    }))
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.parkingSvc.deactivate(this.currentParking?.id!).subscribe({
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
        this.getData(this.currentParking?.id!)
      }
    }))
  }

  // Triggered when new owner assigned
  onOwnerChanged() {
    this.toggleAssignOwner()
    this.currentParking = this.parkingSvc.parkingExtended
  }

  toggleAssignOwner() {
    this.isAssigning = !this.isAssigning
  }

}
