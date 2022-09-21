import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  // Data
  today: Date = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
