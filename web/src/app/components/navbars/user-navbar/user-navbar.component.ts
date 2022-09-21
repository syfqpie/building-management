import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  // Data
  @Input() isMenuOpen: boolean = true
  @Output() toggleMenuEvent = new EventEmitter<string>()

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    return this.toggleMenuEvent.emit()
  }

  logout() {
    return this.authSvc.logout()
  }

}
