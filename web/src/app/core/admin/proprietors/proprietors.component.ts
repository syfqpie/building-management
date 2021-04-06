import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';
import { Genders } from 'src/app/shared/codes/gender';
import { Titles } from 'src/app/shared/codes/title';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { Proprietor } from 'src/app/shared/services/proprietors/proprietors.model';
import { ProprietorsService } from 'src/app/shared/services/proprietors/proprietors.service';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-proprietors',
  templateUrl: './proprietors.component.html',
  styleUrls: ['./proprietors.component.scss'],
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
export class ProprietorsComponent implements OnInit {

  // Data
  proprietors: Proprietor[] = []
  units: UnitExtended[] = []
  
  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Form
  proprietorForm: FormGroup
  proprietorFormMessages = {
    'name': [
      { type: 'required', message: 'Required' }
    ]
  }

  // Toggler
  addModal: boolean = false;

  // Subscriber
  subscription: Subscription

  // Predefined 
  titles = Titles
  genders = Genders

  constructor(
    private proprietorService: ProprietorsService,
    private unitService: UnitsService,
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
      this.proprietorService.getAll(),
      this.unitService.getAll()
    ]).subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.proprietors = this.proprietorService.proprietors
        this.units = this.unitService.units
        this.tableRows = [...this.proprietors]
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
    this.proprietorForm = this.fb.group({
      title: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      nric: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      gender: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      phone_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      moved_in_at: new FormControl(null, Validators.compose([
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

  create() {
    let formattedDate = this.proprietorForm.value['moved_in_at'] + 'T00:00:00.000000Z'
    this.proprietorForm.controls['moved_in_at'].patchValue(formattedDate)

    this.loadingBar.useRef('http').start()
    this.proprietorService.create(this.proprietorForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.notify.openToastrSuccess('Success', 'Registered new proprietor')
        this.toggleAddModal('success')
        this.getData()
        this.proprietorForm.reset()
        this.initForm()
      }
    )
  }

  view(row) {
    let path = '/admin/proprietors/information'
    let extras = row['id']
    let queryParams = {
      queryParams: {
        id: extras
      }
    }
    this.router.navigate([path], queryParams)
  }

  showForm() {
    console.log(this.proprietorForm.value)
  }

}
