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

import { Resident } from 'src/app/shared/services/resident/resident.model';
import { ResidentService } from 'src/app/shared/services/resident/resident.service';
import { UnitService } from 'src/app/shared/services/unit/unit.service';

@Component({
  selector: 'app-assign-owner',
  templateUrl: './assign-owner.component.html',
  styleUrls: ['./assign-owner.component.scss']
})
export class AssignOwnerComponent implements OnInit, OnDestroy {

  // Input
  @Input() unitId!: number

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
    private unitSvc: UnitService,
    private residentSvc: ResidentService
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

    this.svcSubscription.add(this.unitSvc.assignOwner(
      this.unitId,
      formSetup
    ).subscribe({
      next: () => {
        this.isProcessing = false
        this.loadingBar.useRef('http').complete()

        this.notifySvc.success(
          'Success', 
          'Owner has been assigned to this unit'
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
