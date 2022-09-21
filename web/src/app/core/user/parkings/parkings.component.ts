import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { ParkingExtended } from 'src/app/shared/services/parkings/parkings.model';
import { ParkingsService } from 'src/app/shared/services/parkings/parkings.service';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})
export class ParkingsComponent implements OnInit, OnDestroy  {

  // Data
  parkings: ParkingExtended[] = []

  // Table
  ColumnMode = ColumnMode
  tableRows: ParkingExtended[] = []
  tableMessages = {
    totalMessage: 'total of records'
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
  isAddNew: boolean = false
  
  // Subscription
  subscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private parkingSvc: ParkingsService
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
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = this.parkingSvc.getAllExtended().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.parkings = this.parkingSvc.parkingsExtended
        this.tableRows = [...this.parkings]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/parkings/detail', selected])
  }

  toggleAddModal() {
    this.isAddNew = !this.isAddNew
  }

}
