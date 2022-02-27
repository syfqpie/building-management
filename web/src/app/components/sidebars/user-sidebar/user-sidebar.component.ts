import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/shared/menus/menu.item';
import { ParentItems } from 'src/app/shared/menus/menu.model';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  sideMenu: ParentItems[] = ROUTES

  constructor() { }

  ngOnInit(): void {
  }

}
