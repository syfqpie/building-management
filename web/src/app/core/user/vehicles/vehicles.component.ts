import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Vehicle, VehicleType } from 'src/app/shared/services/vehicle/vehicle.model';
import { VehicleService } from 'src/app/shared/services/vehicle/vehicle.service';
import { TABLE_CLASS, TABLE_MESSAGES } from 'src/app/shared/constants/datatable.constant';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  // Data
  vehicles: Vehicle[] = []

  // Predefined
  vehicleType = VehicleType

  // Table
  ColumnMode = ColumnMode
  tableRows: Vehicle[] = []
  tableMessages = TABLE_MESSAGES
  tableClass = TABLE_CLASS

  // Checker
  isProcessing: boolean = false

  // Subscriber
  subscription: Subscription = new Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private vehicleSvc: VehicleService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    // For loading status
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      this.vehicleSvc.list().subscribe({
        next: () => {
          // Update loading status
          this.loadingBar.useRef('http').complete()
          this.isProcessing = false
        },
        error: () => {
          // Update loading status
          this.loadingBar.useRef('http').stop()
          this.isProcessing = false
        },
        complete: () => {
          // Assign values
          this.vehicles = this.vehicleSvc.vehicles
          this.tableRows = [...this.vehicles]
        }
      })
    )
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/vehicles/detail', selected])
  }

}
