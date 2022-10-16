import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Resident } from 'src/app/shared/services/resident/resident.model';
import { ResidentService } from 'src/app/shared/services/resident/resident.service';
import { ResidentRegistrationComponent } from 'src/app/components/residents/resident-registration/resident-registration.component';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit, OnDestroy {

  // Data
  residents: Resident[] = []

  // table
  ColumnMode = ColumnMode
  tableRows: Resident[] = []
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
  
  // Subscription
  subscription: Subscription | undefined

  // Event
  @ViewChild(ResidentRegistrationComponent) registerModal: ResidentRegistrationComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private residentSvc: ResidentService
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

    this.subscription = this.residentSvc.list().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.residents = this.residentSvc.residents
        this.tableRows = [...this.residents]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/residents/detail', selected])
  }

  toggleModal() {
    this.registerModal?.toggleModal()
  }

}
