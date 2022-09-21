import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/shared/handlers/jwt/jwt.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  // Checker
  isGotToken: boolean = false

  constructor(
    private jwtSvc: JwtService
  ) { }

  ngOnInit(): void {
    this.checkToken()
  }

  checkToken() {
    const token = this.jwtSvc.getToken('accessToken')
    if (token) {
      this.isGotToken = true
    } else {
      this.isGotToken = false
    }
  }

}
