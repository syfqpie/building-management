import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription } from 'rxjs';
import { Resident } from 'src/app/shared/services/residents/residents.model';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';
import { Unit, UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {

  // Data
  currentUnit: UnitExtended | undefined
  searchedResidents: Resident[] = []
  selectedResident: Resident | undefined

  // Checker
  isProcessing: boolean = false
  isAssignResident: boolean = false
  isSearching: boolean = false

  // Subscription
  svcSubscription: Subscription = new Subscription
  routeSubscription: Subscription | undefined
  eventSubscription: Subscription | undefined

  // Event
  @ViewChild('residentSearchInput', { static: false }) residentSearchInput: ElementRef | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private unitSvc: UnitsService,
    private residentSvc: ResidentsService
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
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
    // Unsubscribe route subscription
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    // Unsubscribe event subscription
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe()
    }
  }


  getData(id: number) {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(this.unitSvc.getOneExtended(id).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.currentUnit = this.unitSvc.unitExtended
        console.log(this.currentUnit)
      }
    }))
  }

  activate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(this.unitSvc.activate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  deactivate() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(this.unitSvc.deactivate(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  enableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(this.unitSvc.enableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  disableMaintenance() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.svcSubscription.add(this.unitSvc.disableMaintenance(this.currentUnit?.id!).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.getData(this.currentUnit?.id!)
      }
    }))
  }

  toggleAssignResident() {
    this.isAssignResident = !this.isAssignResident
    if (this.isAssignResident) {
      const timer = setTimeout(
        () => {
          this.startSearchPipe()
        }, 500
      )
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

  onSelectResident(resident: Resident) {
    this.selectedResident = resident
    console.log(this.selectedResident)
  }

  cancelAssignResident() {
    this.selectedResident = undefined
    this.searchedResidents = []
    const timer = setTimeout(
      () => {
        this.startSearchPipe()
      }, 500
    )
  }

  assignResident() {
    
  }

}
