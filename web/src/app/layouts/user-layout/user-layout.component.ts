import { Component, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { slideLeftRightAnimation } from 'src/app/shared/animations/animation';

import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styles: [
  ],
  animations: [slideLeftRightAnimation]
})
export class UserLayoutComponent implements OnInit, OnDestroy {

  // Data
  currentUser: User | undefined

  // Checker
  isMobileResolution: boolean = false
  isMenuOpen: boolean = true

  // Loading bar
  barConfig = {
    color: '#fff',
    includeSpinner: false,
    height: '5px',
    ref: 'http'
  }

  constructor(
    private userSvc: UsersService,
  ) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true
    } else {
      this.isMobileResolution = false
    }
  }

  ngOnInit(): void {
    this.isMenuOpen = true
    this.currentUser = this.userSvc.currentUser
  }

  ngOnDestroy(): void {}

  @HostListener('window:resize', ['$event'])
  isMobile() {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true
    } else {
      this.isMobileResolution = false
    }
  }

  receiveToggle() {
    return this.isMenuOpen = !this.isMenuOpen
  }

}
