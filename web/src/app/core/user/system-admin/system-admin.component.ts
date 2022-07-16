import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { UserVerification } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit, OnDestroy {

  // Data
  users: UserVerification[] = []

  rows: UserVerification[] = []
  columns = [
    { name: 'Id', prop: 'id' },
    { name: 'Email', prop: 'email' },
    { name: 'Last login at', prop: 'lastLogin' },
    { name: 'Verification', prop: 'verification[0].verified' }
  ]
  loadingIndicator: boolean = true
  reorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of users'
  }
  selected: UserVerification[] = []
  SelectionType = SelectionType
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

  subscription: Subscription | undefined

  constructor(
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
    this.subscription = this.userSvc.getAllVerification().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.users = this.userSvc.userVerifications
        this.rows = [...this.users]
      }
    })
  }

  // Table on select row
  onSelect(selected: UserVerification[]) {
    console.log('Select Event', selected);
  }

  // Sort by verification
  companyComparator(propA: any, propB: any) {
    if (propA[0].verified < propB[0].verified) {
      return -1;
    } else if (propA[0].verified > propB[0].verified) {
      return 1
    }
    return 0
  }

}
