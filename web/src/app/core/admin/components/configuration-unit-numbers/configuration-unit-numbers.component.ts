import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';

@Component({
  selector: 'app-configuration-unit-numbers',
  templateUrl: './configuration-unit-numbers.component.html',
  styleUrls: ['./configuration-unit-numbers.component.scss'],
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
export class ConfigurationUnitNumbersComponent implements OnInit {

  // Data
  unitNumbers: UnitNumber[] = []
  unitNumber: UnitNumber
  
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Form
  unitNumberForm: FormGroup
  unitNumberFormMessages = {
    'unit_number': [
      { type: 'required', message: 'Required' }
    ]
  }

  // Toggler
  addModal: boolean = false;
  patchModal: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private unitNumberService: UnitNumbersService,
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
    this.subscription = this.unitNumberService.getAll().subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.unitNumbers = this.unitNumberService.unitNumbers
        this.tableRows = [...this.unitNumbers]
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
    this.unitNumberForm = this.fb.group({
      unit_number: new FormControl(null, Validators.compose([
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
      this.unitNumber = row
      this.unitNumberForm.controls['unit_number'].patchValue(this.unitNumber['unit_number'])
      this.unitNumberForm.controls['is_active'].patchValue(this.unitNumber['is_active'])
    }
    else if (type === 'close') {
      this.unitNumber = null
      this.unitNumberForm.controls['unit_number'].patchValue(null)
      this.unitNumberForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Closed')
    }
    else if (type === 'cancel') {
      this.unitNumber = null
      this.unitNumberForm.controls['unit_number'].patchValue(null)
      this.unitNumberForm.controls['is_active'].patchValue(true)
      this.notify.openToastrInfo('', 'Canceled')
    }
    else if (type === 'success') {
      this.unitNumber = null
    }
  }

  create() {
    this.loadingBar.useRef('http').start()
    this.unitNumberService.create(this.unitNumberForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('Success', 'Registered new unit number')
        this.toggleAddModal('success')
        this.getData()
      },
    )
  }

  update() {
    this.loadingBar.useRef('http').start()
    this.unitNumberService.patch(this.unitNumber['id'], this.unitNumberForm.value).subscribe(
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
        this.unitNumberForm.reset()
      },
    )
  }

}
