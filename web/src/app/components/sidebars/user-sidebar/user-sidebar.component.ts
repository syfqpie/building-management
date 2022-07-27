import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { ROUTES } from 'src/app/shared/menus/menu.item';
import { ParentItems } from 'src/app/shared/menus/menu.model';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  menus: NavItem[] = [
    { 
      path: ['/dashboard'], 
      title: 'Dashboard',
      type: 'link',
      icon: 'fa-solid fa-house-user'
    },
    { 
      path: ['/test'], 
      title: 'Test',
      type: 'link',
      icon: 'fa-solid fa-flask'
    },
    {
      path: ['/management', 'units'], 
      title: 'Units',
      type: 'sub',
      icon: 'fa-solid fa-building',
      children: [
        {
          path: ['/management', 'units'],
          title: 'Management'
        },
        {
          path: ['/management', 'units', 'configuration'],
          title: 'Configuration'
        }
      ]
    },
    { 
      path: ['/management', 'renters'], 
      title: 'Renters',
      type: 'link',
      icon: 'fa-solid fa-building-user'
    },
    { 
      path: ['/settings'], 
      title: 'Settings',
      type: 'link',
      icon: 'fa-solid fa-cogs'
    },
    { 
      path: ['/system-admin'], 
      title: 'System Admin',
      type: 'link',
      icon: 'fa-solid fa-user-shield'
    },
    { 
      path: ['/about-system'], 
      title: 'About',
      type: 'link',
      icon: 'fa-solid fa-circle-info'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
