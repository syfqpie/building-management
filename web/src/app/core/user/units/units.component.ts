import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Block } from 'src/app/shared/services/block/block.model';
import { Floor } from 'src/app/shared/services/floor/floor.model';
import { Unit } from 'src/app/shared/services/unit/unit.model';
import { UnitNumber } from 'src/app/shared/services/unit-number/unit-number.model';
import { BlockService } from 'src/app/shared/services/block/block.service';
import { FloorService } from 'src/app/shared/services/floor/floor.service';
import { UnitService } from 'src/app/shared/services/unit/unit.service';
import { UnitNumberService } from 'src/app/shared/services/unit-number/unit-number.service';
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
    private unitSvc: UnitService,
    private blockSvc: BlockService,
    private floorSvc: FloorService,
    private unitNumberSvc: UnitNumberService
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
      this.unitSvc.list(),
      this.blockSvc.list(),
      this.floorSvc.list(),
      this.unitNumberSvc.list()
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
