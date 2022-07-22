import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';

import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';

@Component({
  selector: 'app-unit-numbers-table',
  templateUrl: './unit-numbers-table.component.html',
  styleUrls: ['./unit-numbers-table.component.scss']
})
export class UnitNumbersTableComponent implements OnInit, OnDestroy {

  // Data
  unitNumbers: UnitNumber[] = []

  tableRows: UnitNumber[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of unit numbers'
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
    private unitNumberSvc: UnitNumbersService
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
    this.subscription = this.unitNumberSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.unitNumbers = this.unitNumberSvc.unitNumbers
        this.tableRows = [...this.unitNumbers]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/unit-numbers/detail', selected])
  }

  toggleModal() {
    // this.registerModal?.toggleModal()
  }

}
