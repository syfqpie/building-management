import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { EmailVerification } from 'src/app/shared/services/user/user.model';
import { SysRegisterAdminComponent } from 'src/app/components/system-admin/sys-register-admin/sys-register-admin.component';
import { TABLE_CLASS, TABLE_MESSAGES } from 'src/app/shared/constants/datatable.constant';
import { UserService } from 'src/app/shared/services/user/user.service';

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
  tableMessages = TABLE_MESSAGES
  tableClass = TABLE_CLASS

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription = new Subscription

  // Event
  @ViewChild(SysRegisterAdminComponent) registerModal: SysRegisterAdminComponent | undefined
  
  constructor(
    private loadingBar: LoadingBarService,
    private userSvc: UserService
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
      this.userSvc.getAllVerification().subscribe({
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
          // Assign data to table
          this.verifications = this.userSvc.emailVerifications
          this.tableRows = [...this.verifications]
        }
      })
    )
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
