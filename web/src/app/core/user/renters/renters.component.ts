import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { RenterRegistrationComponent } from 'src/app/components/renters/renter-registration/renter-registration.component';

import { Renter } from 'src/app/shared/services/renters/renters.model';
import { RentersService } from 'src/app/shared/services/renters/renters.service';

@Component({
  selector: 'app-renters',
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.scss']
})
export class RentersComponent implements OnInit, OnDestroy {

  // Data
  renters: Renter[] = []

  tableRows: Renter[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of renters'
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
  @ViewChild(RenterRegistrationComponent) registerModal: RenterRegistrationComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private renterSvc: RentersService
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
    this.subscription = this.renterSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.renters = this.renterSvc.renters
        this.tableRows = [...this.renters]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/renters/detail', selected])
  }

  toggleModal() {
    this.isRegisterNew = !this.isRegisterNew
    this.registerModal?.toggleModal()
  }

}