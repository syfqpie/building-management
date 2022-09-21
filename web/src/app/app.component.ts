import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // Data
  title = 'building-management';

  // Loading bar
  public barConfig = {
    color: '#5660d9',
    includeSpinner: false,
    height: '5px',
    ref: 'http'
  }

  // Subscription
  subscription: Subscription = new Subscription

  constructor(
    private router: Router,
    private titleSvc: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe(
      () => {
        const currentRoute = this.getChild(this.activatedRoute)

        currentRoute.data.subscribe(data => {
          // Set title
          this.titleSvc.setTitle(`${ data['title'] }`)
        })
      }
    ))
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      // Recursive to get current
      return this.getChild(activatedRoute.firstChild)
    } else {
      // Return current
      return activatedRoute
    }
  }

}
