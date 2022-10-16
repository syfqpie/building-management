import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from 'src/app/shared/services/user/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  // Data
  currentTab: string = 'details' // details | password
  accountInfo: User | undefined

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.accountInfo = this.userSvc.currentUser
  }

  ngOnDestroy(): void { }

  changeTab(tab: string) {
    this.currentTab = tab
  }

}
