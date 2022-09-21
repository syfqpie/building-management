import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BlocksTableComponent } from 'src/app/components/units/blocks-table/blocks-table.component';
import { FloorsTableComponent } from 'src/app/components/units/floors-table/floors-table.component';
import { UnitNumbersTableComponent } from 'src/app/components/units/unit-numbers-table/unit-numbers-table.component';

@Component({
  selector: 'app-units-configuration',
  templateUrl: './units-configuration.component.html',
  styleUrls: ['./units-configuration.component.scss']
})
export class UnitsConfigurationComponent implements OnInit, OnDestroy {

  // Data
  currentTab: string = 'blocks' // blocks | floors | unit-numbers

  // Child
  @ViewChild(BlocksTableComponent) blockTable: BlocksTableComponent | undefined
  @ViewChild(FloorsTableComponent) floortable: FloorsTableComponent | undefined
  @ViewChild(UnitNumbersTableComponent) unitNumbertable: UnitNumbersTableComponent | undefined

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  changeTab(tab: string) {
    this.currentTab = tab
  }

  toggleBlockModal() {
    this.blockTable?.toggleAddModal()
  }

  toggleFloorModal() {
    this.floortable?.toggleAddModal()
  }

  toggleUnitNumberModal() {
    this.unitNumbertable?.toggleAddModal()
  }

}
