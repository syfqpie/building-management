import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { ParkingExtended, ParkingPassCurrent } from 'src/app/shared/services/parking/parking.model';
import { ParkingService } from 'src/app/shared/services/parking/parking.service';
import { ModalSize } from 'src/app/components/reusables/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.scss']
})
export class ParkingDetailComponent implements OnInit, OnDestroy {

  // Data
  currentParking: ParkingExtended | undefined
  currentPass: ParkingPassCurrent | undefined

  // Checker
  isProcessing: boolean = false
  isAssigning: boolean = false
  isConfirmOpen: boolean = false

  // Subscription
  subscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined

  // Predefined
  modalSize = ModalSize

  constructor(
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private route: ActivatedRoute,
    private parkingSvc: ParkingService
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

    this.subscription.add(this.parkingSvc.retrieveExtended(id).subscribe({
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

        // Get pass data if parking is occupied
        if (this.currentParking?.isOccupied) {
          this.getPass()
        }
      }
    }))
  }

  getPass() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.parkingSvc.getCurrentPass(this.currentParking?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentPass = this.parkingSvc.currentPass
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
          'Parking activated'
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
          'Parking deactivated'
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

  checkoutResident() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      this.parkingSvc.checkoutResident(this.currentParking?.id!).subscribe({
        next: () => {
          this.loadingBar.useRef('http').complete()
          this.isProcessing = false
  
          this.notifySvc.success(
            'Success', 
            'Resident checked out'
          )
        },
        error: () => {
          this.loadingBar.useRef('http').stop()
          this.isProcessing = false
        },
        complete: () => {
          this.currentParking = this.parkingSvc.parkingExtended
          this.toggleConfirm()
        }
      })
    )
  }

  // Triggered when new owner assigned
  onOwnerChanged() {
    this.toggleAssignOwner()
    this.currentParking = this.parkingSvc.parkingExtended
  }

  toggleAssignOwner() {
    this.isAssigning = !this.isAssigning
  }

  toggleConfirm() {
    this.isConfirmOpen = !this.isConfirmOpen
  }

  cancelDialog() {
    console.log('Cancelled')
    this.toggleConfirm()
  }

  confirmDialog() {
    console.log('Confirmed')
    this.checkoutResident()
  }

}
