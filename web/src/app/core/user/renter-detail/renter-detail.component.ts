import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { Renter } from 'src/app/shared/services/renters/renters.model';
import { RentersService } from 'src/app/shared/services/renters/renters.service';

@Component({
  selector: 'app-renter-detail',
  templateUrl: './renter-detail.component.html',
  styleUrls: ['./renter-detail.component.scss']
})
export class RenterDetailComponent implements OnInit, OnDestroy {

  // Data
  currentRenter: Renter | undefined

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription | undefined
  activateSubscription: Subscription | undefined
  deactivateSubscription: Subscription | undefined
  routeSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private renterSvc: RentersService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(
      (params) => {
        if (params.get('id')) {
          const id = Number(params.get('id'))
          this.getData(id)
        }
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.renterSvc.getOne(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentRenter = this.renterSvc.renter
      }
    })
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.activateSubscription = this.renterSvc.activate(this.currentRenter?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentRenter = this.renterSvc.renter
      }
    })
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.deactivateSubscription = this.renterSvc.deactivate(this.currentRenter?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentRenter = this.renterSvc.renter
      }
    })
  }

}
