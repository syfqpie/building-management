import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { Block } from 'src/app/shared/services/blocks/blocks.model';
import { BlocksService } from 'src/app/shared/services/blocks/blocks.service';
import { Floor } from 'src/app/shared/services/floors/floors.model';
import { FloorsService } from 'src/app/shared/services/floors/floors.service';
import { UnitNumber } from 'src/app/shared/services/unit-numbers/unit-numbers.model';
import { UnitNumbersService } from 'src/app/shared/services/unit-numbers/unit-numbers.service';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-management-units',
  templateUrl: './management-units.component.html',
  styleUrls: ['./management-units.component.scss'],
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
export class ManagementUnitsComponent implements OnInit {

  // Data
  units: UnitExtended[] = []
  unit: UnitExtended
  blocks: Block[] = []
  floors: Floor[] = []
  unitNumbers: UnitNumber[] = []
  block: Block
  floor: Floor
  unitNumber: UnitNumber
  unitNo: string
  
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Form
  unitForm: FormGroup
  unitFormMessages = {
    'unit': [
      { type: 'required', message: 'Required' }
    ]
  }

  // Toggler
  addModal: boolean = false;
  patchModal: boolean = false

  // Subscriber
  subscription: Subscription

  constructor(
    private unitService: UnitsService,
    private blockService: BlocksService,
    private floorService: FloorsService,
    private unitNumberService: UnitNumbersService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService,
    private router: Router
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
    this.subscription = forkJoin([
      this.unitService.getAll(),
      this.blockService.getAll(),
      this.floorService.getAll(),
      this.unitNumberService.getAll()
    ]).subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.units = this.unitService.units
        this.blocks = this.blockService.blocks
        this.floors = this.floorService.floors
        this.unitNumbers = this.unitNumberService.unitNumbers

        this.tableRows = [...this.units]
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
    this.unitForm = this.fb.group({
      block: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      floor: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      unit_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      is_active: new FormControl(true, Validators.compose([
        Validators.required
      ])),
      is_maintenance: new FormControl(false, Validators.compose([
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

  generateUnitNo() {
    this.blocks.find(block => String(block['id']) === String(this.unitForm.value['block'])? this.block = block: this.block = null);
    this.floors.find(floor => String(floor['id']) === String(this.unitForm.value['floor'])? this.floor = floor: this.floor = null);
    this.unitNumbers.find(unitNumber => String(unitNumber['id']) === String(this.unitForm.value['unit_number'])? this.unitNumber = unitNumber: this.unitNumber = null);

    let unitNoTemp = String(this.block['block']) 
                  + '-' + String(this.floor['floor']) 
                  + '-' + String(this.unitNumber['unit_number'])
    this.unitNo = unitNoTemp
  }

  toggleAddModal(type) {
    this.addModal = !this.addModal;
    if (type === 'open') {
      this.unitForm.controls['block'].patchValue(this.blocks[0]['id'])
      this.unitForm.controls['floor'].patchValue(this.floors[0]['id'])
      this.unitForm.controls['unit_number'].patchValue(this.unitNumbers[0]['id'])

      // Generate unit no.
      this.blocks.find(block => String(block['id']) === String(this.unitForm.value['block'])? this.block = block: this.block = null);
      this.floors.find(floor => String(floor['id']) === String(this.unitForm.value['floor'])? this.floor = floor: this.floor = null);
      this.unitNumbers.find(unitNumber => String(unitNumber['id']) === String(this.unitForm.value['unit_number'])? this.unitNumber = unitNumber: this.unitNumber = null);
      
      let unitNoTemp = String(this.block['block']) 
                  + '-' + String(this.floor['floor']) 
                  + '-' + String(this.unitNumber['unit_number'])
      this.unitNo = unitNoTemp
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

  create() {
    this.loadingBar.useRef('http').start()
    this.unitService.create(this.unitForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('Success', 'Registered new unit')
        this.toggleAddModal('success')
        this.getData()
        this.unitForm.reset()
        this.initForm()
      }
    )
  }

  view(row) {
    let path = '/admin/units-management/units/information'
    let extras = row['id']
    let queryParams = {
      queryParams: {
        id: extras
      }
    }
    this.router.navigate([path], queryParams)
  }

}
