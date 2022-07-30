import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { ResidentRegistrationComponent } from 'src/app/components/residents/resident-registration/resident-registration.component';

import { Resident } from 'src/app/shared/services/residents/residents.model';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit, OnDestroy {

  // Data
  residents: Resident[] = []

  tableRows: Resident[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of residents'
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
  @ViewChild(ResidentRegistrationComponent) registerModal: ResidentRegistrationComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private residentSvc: ResidentsService
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
    this.subscription = this.residentSvc.getAll().subscribe({
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
    this.isRegisterNew = !this.isRegisterNew
    this.registerModal?.toggleModal()
  }

}
