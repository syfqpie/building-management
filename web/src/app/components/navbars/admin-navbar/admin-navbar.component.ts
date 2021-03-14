import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  animations: [
    trigger('collapseTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('75ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminNavbarComponent implements OnInit {

  // Ref
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef;
  @ViewChild('dropdown', { static: false }) dropdown: ElementRef;

  // Toggler
  isCollapsed: boolean = false

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router
  ) {
    // Bind on doc
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  ngOnInit(): void {}

  toggleDropdown(event) {
    this.isCollapsed = !this.isCollapsed
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

  offClickHandler(event:any) {
     // Check click origin
    if (!this.btnDropdownRef.nativeElement.contains(event.target)) {
      if (this.isCollapsed) {
        this.isCollapsed = !this.isCollapsed
      }
    }
  }

}
