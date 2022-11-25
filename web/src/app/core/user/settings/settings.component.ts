import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from 'src/app/shared/services/user/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

enum TabChoice {
  DETAILS = 'details',
  PASSWORD = 'password'
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  // Data
  currentTab: TabChoice = TabChoice.DETAILS
  accountInfo: User | undefined

  // Predefined
  readonly TabChoice = TabChoice

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.accountInfo = this.userSvc.currentUser
  }

  ngOnDestroy(): void { }

  changeTab(tab: TabChoice) {
    this.currentTab = tab
  }

}
