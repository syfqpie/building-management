import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';

import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';

@Component({
  selector: 'app-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss']
})
export class BlocksTableComponent implements OnInit, OnDestroy {

  // Data
  blocks: Block[] = []

  tableRows: Block[] = []
  tableLoadingIndicator: boolean = true
  tableReorderable: boolean = true
  ColumnMode = ColumnMode
  tableMessages = {
    totalMessage: 'total of blocks'
  }
  tableClass = {
    sortAscending: 'fa-solid fa-angle-up ms-1 small',
    sortDescending: 'fa-solid fa-angle-down ms-1 small',
    pagerLeftArrow: 'fa-solid fa-angle-left ms-1 small',
    pagerRightArrow: 'fa-solid fa-angle-right ms-1 small',
    pagerPrevious: 'fa-solid fa-angles-left ms-1 small',
    pagerNext: 'fa-solid fa-angles-right ms-1 small'
  }

  // Checker
  isProcessing: boolean = false
  isRegisterNew: boolean = false
  
  // Subscription
  subscription: Subscription | undefined

  // Event
  // @ViewChild(RenterRegistrationComponent) registerModal: RenterRegistrationComponent | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private blockSvc: BlocksService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.isProcessing = true
    this.subscription = this.blockSvc.getAll().subscribe({
      next: () => {
        this.loadingBar.useRef('http').complete()
        this.isProcessing = false
      },
      error: () => {
        this.loadingBar.useRef('http').stop()
        this.isProcessing = false
      },
      complete: () => {
        this.blocks = this.blockSvc.blocks
        this.tableRows = [...this.blocks]
      }
    })
  }

  // Table on select row
  onSelect(selected: number) {
    this.router.navigate(['management/blocks/detail', selected])
  }

  toggleModal() {
    // this.registerModal?.toggleModal()
  }

}
