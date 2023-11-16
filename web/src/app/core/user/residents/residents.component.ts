import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Resident } from 'src/app/shared/services/resident/resident.model';
import { ResidentService } from 'src/app/shared/services/resident/resident.service';
import { ResidentRegistrationComponent } from 'src/app/components/residents/resident-registration/resident-registration.component';
import { TABLE_CLASS, TABLE_MESSAGES } from 'src/app/shared/constants/datatable.constant';

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
  tableMessages = TABLE_MESSAGES
  tableClass = TABLE_CLASS

  // Checker
  isProcessing: boolean = false
  
  // Subscription
  subscription: Subscription = new Subscription

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
    // For loading status
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(
      this.residentSvc.list().subscribe({
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
          // Assign data
          this.residents = this.residentSvc.residents
          this.tableRows = [...this.residents]
        }
      })
    )
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/residents/detail', selected])
  }

  toggleModal() {
    this.registerModal?.toggleModal()
  }

}
