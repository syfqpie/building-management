import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cheatUsername = 'matgempak95@gmail.com'
  cheatPwd = 'test1234##'
  
  constructor() { }

  ngOnInit(): void {
  }

}
