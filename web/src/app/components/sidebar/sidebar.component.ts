import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_ADMIN, ROUTES_PUBLIC } from 'src/app/shared/menu/menu-items';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('collapseTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  // 
  collapseShow = 'hidden';
  menuItems: any[];
  isCollapsed = true;
  menu;

  // Logo
  logo = '/assets/img/default/bums-logo.png'

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initMenu()
  }

  initMenu() {
    if (this.authService.userRole == 1) {
      this.menu = ROUTES_ADMIN
    }
    else if (this.authService.userRole == 2) {
      this.menu = ROUTES_PUBLIC
    } 

    this.menuItems = this.menu.filter(menuItem => menuItem)
    this.router.events.subscribe(
      (event) => {
        this.isCollapsed = true
      }
    )
  }
  
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
