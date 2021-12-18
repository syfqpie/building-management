import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { Floor } from 'src/app/shared/services/floors/floors.model';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';

@Component({
  selector: 'app-configuration-floors',
  templateUrl: './configuration-floors.component.html',
  styleUrls: ['./configuration-floors.component.scss'],
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
export class ConfigurationFloorsComponent implements OnInit {

  // Data
  floors: Floor[] = []
  floor: Floor
  
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Form
  floorForm: FormGroup
  floorFormMessages = {
    'floor': [
      { type: 'required', message: 'Required' }
    ]
  }

  // Toggler
  addModal: boolean = false;
  patchModal: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private floorService: FloorsService,
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
    this.subscription = this.floorService.getAll().subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.floors = this.floorService.floors
        this.tableRows = [...this.floors]
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
    this.floorForm = this.fb.group({
      floor: new FormControl(null, Validators.compose([
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
      this.floor = row
      this.floorForm.controls['floor'].patchValue(this.floor['floor'])
      this.floorForm.controls['is_active'].patchValue(this.floor['is_active'])
    }
    else if (type === 'close') {
      this.floor = null
      this.floorForm.controls['floor'].patchValue(null)
      this.floorForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Closed')
    }
    else if (type === 'cancel') {
      this.floor = null
      this.floorForm.controls['floor'].patchValue(null)
      this.floorForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Canceled')
    }
    else if (type === 'success') {
      this.floor = null
    }
  }

  create() {
    this.loadingBar.useRef('http').start()
    this.floorService.create(this.floorForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('', 'Success')
        this.toggleAddModal('success')
        this.getData()
        this.floorForm.reset()
        this.initForm()
      }
    )
  }

  update() {
    this.loadingBar.useRef('http').start()
    this.floorService.patch(this.floor['id'], this.floorForm.value).subscribe(
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
        this.floorForm.reset()
        this.initForm()
      }
    )
  }

}
