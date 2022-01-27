import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-units-configuration',
  templateUrl: './units-configuration.component.html',
  styleUrls: ['./units-configuration.component.scss']
})
export class UnitsConfigurationComponent implements OnInit, OnDestroy {

  // Data

  // Form

  // Subscriber
  subscription: Subscription

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
