import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { EmailVerification } from 'src/app/shared/services/users/users.model';
import { SysRegisterAdminComponent } from 'src/app/components/system-admin/sys-register-admin/sys-register-admin.component';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit, OnDestroy {

  // Data
  verifications: EmailVerification[] = []

  // Table
  ColumnMode = ColumnMode
  tableRows: EmailVerification[] = []
  tableMessages = {
    totalMessage: 'total of records'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-2 small',
    sortDescending: 'fa-solid fa-angle-down ms-2 small',
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
  @ViewChild(SysRegisterAdminComponent) registerModal: SysRegisterAdminComponent | undefined
  
  constructor(
    private loadingBar: LoadingBarService,
    private userSvc: UsersService
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

    this.subscription = this.userSvc.getAllVerification().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.verifications = this.userSvc.emailVerifications
        this.tableRows = [...this.verifications]
      }
    })
  }

  // Sort by user type
  userTypeComparator(propA: any, propB: any) {
    if (propA.userType > propB.userType) {
      return -1;
    } else if (propA.userType < propB.userType) {
      return 1
    }
    return 0
  }

  toggleModal() {
    this.registerModal?.toggleModal()
  }

}
