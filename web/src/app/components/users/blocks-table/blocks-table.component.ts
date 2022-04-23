import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
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

  // Checker
  isLoadingData: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private loadingBar: LoadingBarService,
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
    this.isLoadingData = true

    this.subscription = this.blockSvc.getAll().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.isLoadingData = false
      },
      () => {
        this.loadingBar.useRef('http').stop()
        this.isLoadingData = false
      },
      () => {
        this.blocks = this.blockSvc.blocks
      }
    )
  }

}
