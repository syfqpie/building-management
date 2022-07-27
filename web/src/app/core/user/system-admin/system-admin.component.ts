import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { SysRegisterAdminComponent } from 'src/app/components/system-admin/sys-register-admin/sys-register-admin.component';
import { EmailVerification } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit, OnDestroy {

  // Data
  verifications: EmailVerification[] = []

  rows: EmailVerification[] = []
  loadingIndicator: boolean = true
  reorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of users'
  }
  selected: EmailVerification[] = []
  SelectionType = SelectionType
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left ms-1 small',
    pagerRightArrow: 'fa-solid fa-angle-right ms-1 small',
    pagerPrevious: 'fa-solid fa-angles-left ms-1 small',
    pagerNext: 'fa-solid fa-angles-right ms-1 small'
  }
  @ViewChild('isEmptyCell')
  isEmptyCell: TemplateRef<any> | undefined

  // Checker
  isProcessing: boolean = false
  isRegisterAdmin: boolean = false

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
        this.rows = [...this.verifications]
      }
    })
  }

  // Table on select row
  onSelect(selected: EmailVerification[]) {
    console.log('Select Event', selected)
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
    this.isRegisterAdmin = !this.isRegisterAdmin
    this.registerModal?.toggleModal()
  }

}
