import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { Floor } from 'src/app/shared/services/floors/floors.model';
import { Unit } from 'src/app/shared/services/units/units.model';
import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';
import { UnitsService } from 'src/app/shared/services/units/units.service';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';
import { UnitAddComponent } from 'src/app/components/units/unit-add/unit-add.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit, OnDestroy {

  // Data
  units: Unit[] = []
  blocks: Block[] = []
  floors: Floor[] = []
  unitNumbers: UnitNumber[] = []

  // Table
  ColumnMode = ColumnMode
  tableRows: Unit[] = []
  tableMessages = {
    totalMessage: 'total of records'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left small',
    pagerRightArrow: 'fa-solid fa-angle-right small',
    pagerPrevious: 'fa-solid fa-angles-left small',
    pagerNext: 'fa-solid fa-angles-right small'
  }

  // Checker
  isProcessing: boolean = false
  
  // Subscription
  subscription: Subscription | undefined

  @ViewChild(UnitAddComponent) unitAdd: UnitAddComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private unitSvc: UnitsService,
    private blockSvc: BlocksService,
    private floorSvc: FloorsService,
    private unitNumberSvc: UnitNumbersService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true

    this.subscription = forkJoin([
      this.unitSvc.getAll(),
      this.blockSvc.getAll(),
      this.floorSvc.getAll(),
      this.unitNumberSvc.getAll()
    ]).subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.units = this.unitSvc.units
        this.blocks = this.blockSvc.blocks
        this.floors = this.floorSvc.floors
        this.unitNumbers = this.unitNumberSvc.unitNumbers
        this.tableRows = [...this.units]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/units/detail', selected])
  }

  toggleModal() {
    this.unitAdd?.toggleModal()
  }

}
