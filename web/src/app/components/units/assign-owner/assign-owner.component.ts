import { 
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { Resident } from 'src/app/shared/services/residents/residents.model';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-assign-owner',
  templateUrl: './assign-owner.component.html',
  styleUrls: ['./assign-owner.component.scss']
})
export class AssignOwnerComponent implements OnInit, OnDestroy, AfterViewInit {

  // Input
  @Input() unitId!: number

  // Data
  searchedResidents: Resident[] = []
  selectedResident: Resident | undefined

  // Checker
  isProcessing: boolean = false
  isAssigning: boolean = false
  isSearching: boolean = false
  
  // Subscription
  svcSubscription: Subscription = new Subscription
  eventSubscription: Subscription | undefined
  
  // Event
  @ViewChild('residentSearchInput', { static: false }) residentSearchInput: ElementRef | undefined
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private unitSvc: UnitsService,
    private residentSvc: ResidentsService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.startSearchPipe()
  }

  ngOnDestroy(): void {
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
    // Unsubscribe event subscription
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe()
    }
  }

  startSearchPipe() {
    this.eventSubscription = fromEvent(this.residentSearchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      filter(
        res => res.length > 2
      ),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      (text: string) => {
        this.isSearching = true

        this.svcSubscription.add(this.residentSvc.search(text).subscribe({
          next: () => {
            this.isSearching = false
          },
          error: () => {
            this.isSearching = false
          },
          complete: () => {
            this.searchedResidents = this.residentSvc.residents
          }
        }))
      }
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
    // console.log(this.selectedResident)
  }

  cancelAssignOwner() {
    this.selectedResident = undefined
    this.searchedResidents = []
    const timer = setTimeout(
      () => {
        this.startSearchPipe()
      }, 500
    )
  }

}
