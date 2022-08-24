import { 
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output } from '@angular/core';
import {
  catchError,
  concat,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  Subject,
  Subscription, 
  switchMap, 
  tap } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { Resident } from 'src/app/shared/services/residents/residents.model';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';
import { UnitsService } from 'src/app/shared/services/units/units.service';
import { ParkingsService } from 'src/app/shared/services/parkings/parkings.service';

@Component({
  selector: 'app-assign-lot-owner',
  templateUrl: './assign-lot-owner.component.html',
  styleUrls: ['./assign-lot-owner.component.scss']
})
export class AssignLotOwnerComponent implements OnInit, OnDestroy {

  // Input
  @Input() parkingId!: number

  // Data
  residents$?: Observable<Resident[]>
  residentInput$: Subject<string> = new Subject<string>()
  selectedResident: Resident | undefined

  // Checker
  isProcessing: boolean = false
  isAssigning: boolean = false
  isSearching: boolean = false

  // Subscription
  svcSubscription: Subscription = new Subscription
  
  // Event
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private parkingSvc: ParkingsService,
    private residentSvc: ResidentsService
  ) { }

  ngOnInit(): void {
    this.searchResident()
  }

  ngOnDestroy(): void {
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
  }

  searchResident() {
    this.residents$ = concat(
      of([]), // Default value,
      this.residentInput$.pipe(
        filter(res => {
          return res !== null && res.length >= 3
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => this.isSearching = true),
        switchMap(term => {
          return this.residentSvc.search(term).pipe(
            catchError(() => of([])), // Empty of error
            tap(() => this.isSearching = false)
          )
        })
      )
    )
  }

  assignOwner() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    const formSetup = {
      resident: this.selectedResident!.id
    }

    this.svcSubscription.add(this.parkingSvc.assignOwner(
      this.parkingId,
      formSetup
    ).subscribe({
      next: () => {
        this.isProcessing = false
        this.loadingBar.useRef('http').complete()

        this.notifySvc.success(
          'Success', 
          'Owner has been assigned to this parking'
        )
      },
      error: () => {
        this.isProcessing = false
        this.loadingBar.useRef('http').stop()
      },
      complete: () => {
        this.changedEvent.emit(true)
      }
    }))
  }

  onSelectResident(resident: Resident) {
    this.selectedResident = resident
  }

  cancelAssignOwner() {
    this.selectedResident = undefined
    const timer = setTimeout(
      () => {
        this.searchResident()
      }, 500
    )
  }

}
