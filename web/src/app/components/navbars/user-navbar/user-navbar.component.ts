import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  // Data
  @Input()isMenuOpen: boolean
  @Output() toggleMenuEvent = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    return this.toggleMenuEvent.emit()
  }

  logout() {
    return console.log('Logout user')
  }

}
