import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';

@Component({
  selector: 'app-configuration-blocks',
  templateUrl: './configuration-blocks.component.html',
  styleUrls: ['./configuration-blocks.component.scss'],
  animations: [
    trigger('toggleTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ConfigurationBlocksComponent implements OnInit {

  // Data
  blocks: Block[] = []
  block: Block
  
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Form
  blockForm: FormGroup
  blockFormMessages = {
    'block': [
      { type: 'required', message: 'Required' }
    ]
  }

  // Toggler
  addModal: boolean = false;
  patchModal: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private blockService: BlocksService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.blockService.getAll().subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.blocks = this.blockService.blocks
        this.tableRows = [...this.blocks]
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_table: key
          };
        });
      },
      () => {
        // Unsuccess
        this.loadingBar.useRef('http').complete()
      },
      () => {
        // After
      }
    )
  }

  initForm() {
    this.blockForm = this.fb.group({
      block: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      is_active: new FormControl(true, Validators.compose([
        Validators.required
      ]))
    })
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) { // Kalau semua data ada
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  toggleAddModal(type) {
    this.addModal = !this.addModal;
    if (type === 'open') {
      
    }
    else if (type === 'close') {
      this.notify.openToastrInfo('', 'Closed')
    }
    else if (type === 'cancel') {
      this.notify.openToastrInfo('', 'Canceled')
    }
    else if (type === 'success') {
    }
  }

  toggleUpdateModal(type, row) {
    this.patchModal = !this.patchModal;
    if (type === 'open') {
      this.block = row
      this.blockForm.controls['block'].patchValue(this.block['block'])
      this.blockForm.controls['is_active'].patchValue(this.block['is_active'])
    }
    else if (type === 'close') {
      this.block = null
      this.blockForm.controls['block'].patchValue(null)
      this.blockForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Closed')
    }
    else if (type === 'cancel') {
      this.block = null
      this.blockForm.controls['block'].patchValue(null)
      this.blockForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Canceled')
    }
    else if (type === 'success') {
      this.block = null
    }
  }

  create() {
    this.loadingBar.useRef('http').start()
    this.blockService.create(this.blockForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('Success', 'Registered new block')
        this.toggleAddModal('success')
        this.getData()
      },
    )
  }

  update() {
    this.loadingBar.useRef('http').start()
    this.blockService.patch(this.block['id'], this.blockForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('Success', 'Changes saved')
        this.toggleUpdateModal('success', null)
        this.getData()
        this.blockForm.reset()
      },
    )
  }

}
