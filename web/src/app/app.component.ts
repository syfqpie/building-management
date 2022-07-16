import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'building-management';
  public barConfig = {
    color: '#5660d9',
    includeSpinner: false,
    height: '5px',
    ref: 'http'
  }
}
