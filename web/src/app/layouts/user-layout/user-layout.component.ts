import { Component, HostListener, OnInit, } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { slideLeftRightAnimation } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styles: [
  ],
  animations: [slideLeftRightAnimation]
})
export class UserLayoutComponent implements OnInit {

  // Checker
  isMobileResolution: boolean
  isMenuOpen: boolean

  // Loading bar
  barConfig = {
    color: '#fff',
    includeSpinner: false,
    height: '5px',
    ref: 'http'
  }

  constructor(
    private loadingBar: LoadingBarService
  ) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true
    } else {
      this.isMobileResolution = false
    }
  }

  ngOnInit(): void {
    this.isMenuOpen = true
    console.log(this.isMenuOpen, this.isMobileResolution)
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
    console.log('Toggle clicked')
    return this.isMenuOpen = !this.isMenuOpen
  }

}
