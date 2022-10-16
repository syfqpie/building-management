import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { Resident } from 'src/app/shared/services/resident/resident.model';
import { ResidentService } from 'src/app/shared/services/resident/resident.service';

@Component({
  selector: 'app-resident-detail',
  templateUrl: './resident-detail.component.html',
  styleUrls: ['./resident-detail.component.scss']
})
export class ResidentDetailComponent implements OnInit, OnDestroy {

  // Data
  currentResident: Resident | undefined

  // Checker
  isProcessing: boolean = false

  // Subscription
  subscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private residentSvc: ResidentService
  ) { }

  ngOnInit(): void {
    // Get id and data
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

    this.subscription.add(this.residentSvc.retrieve(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentResident = this.residentSvc.resident
      }
    }))
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.residentSvc.activate(this.currentResident?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentResident = this.residentSvc.resident
      }
    }))
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription.add(this.residentSvc.deactivate(this.currentResident?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentResident = this.residentSvc.resident
      }
    }))
  }

}
