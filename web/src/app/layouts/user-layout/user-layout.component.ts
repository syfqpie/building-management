import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styles: [
  ]
})
export class UserLayoutComponent implements OnInit {

  // Checker
  isMobileResolution: boolean

  constructor() {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  isMobile() {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

}
