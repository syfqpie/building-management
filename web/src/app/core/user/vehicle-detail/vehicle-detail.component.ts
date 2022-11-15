import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { VehicleExtended } from 'src/app/shared/services/vehicle/vehicle.model';
import { VehicleService } from 'src/app/shared/services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {

  // Data
  vehicle: VehicleExtended | undefined

  // Subscription
  subscription: Subscription = new Subscription

  // Checker
  isProcessing: boolean = false

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private vehicleSvc: VehicleService
  ) { }

  ngOnInit(): void {
    // Get id and data
    this.subscription.add(
      this.route.paramMap.subscribe(
        (params) => {
          if (params.get('id')) {
            const id = Number(params.get('id'))
            this.getData(id)
          }
        }
      )
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    
    this.subscription.add(
      this.vehicleSvc.retrieveExtended(id).subscribe({
        next: () => {
          this.loadingBar.useRef('http').complete()
          this.isProcessing = false
        },
        error: () => {
          this.loadingBar.useRef('http').stop()
          this.isProcessing = false
        },
        complete: () => {
          this.vehicle = this.vehicleSvc.vehicleExtended
        }
      })
    )
  }
  
  
}
