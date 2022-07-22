import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
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

  tableRows: Floor[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of floors'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left ms-1 small',
    pagerRightArrow: 'fa-solid fa-angle-right ms-1 small',
    pagerPrevious: 'fa-solid fa-angles-left ms-1 small',
    pagerNext: 'fa-solid fa-angles-right ms-1 small'
  }

  // Checker
  isProcessing: boolean = false
  isRegisterNew: boolean = false
  
  // Subscription
  subscription: Subscription | undefined

  // Event
  // @ViewChild(RenterRegistrationComponent) registerModal: RenterRegistrationComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
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
    this.isProcessing = true
    this.subscription = this.floorSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.floors = this.floorSvc.floors
        this.tableRows = [...this.floors]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/floors/detail', selected])
  }

  toggleModal() {
    // this.registerModal?.toggleModal()
  }

}
