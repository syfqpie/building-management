import { Component, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { slideLeftRightAnimation } from 'src/app/shared/animations/animation';
import { JwtService } from 'src/app/shared/handlers/jwt/jwt.service';
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

  // Subscriber
  subscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private userSvc: UsersService,
    private jwtSvc: JwtService
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
    if (!this.currentUser) {
      // this.getData()
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

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

  getData() {
    // Get token
    const token = this.jwtSvc.getToken('accessToken')
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(token)

    this.loadingBar.useRef('http').start()
    this.subscription = this.userSvc.getOne(decodedToken.user_id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
      },
      error: (err) => {
        this.loadingBar.useRef('http').stop()
      },
      complete: () => {
        this.currentUser = this.userSvc.currentUser
      }
    })
  }

}
