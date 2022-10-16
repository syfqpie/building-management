import { Component, EventEmitter, Input,
  OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, concat, debounceTime, distinctUntilChanged, filter,
  Observable, of, Subject, Subscription,  switchMap,  tap } from 'rxjs';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { collapsedAnimation } from 'src/app/shared/animations/animation';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { Resident } from 'src/app/shared/services/residents/residents.model';
import { Vehicle, VehicleType } from 'src/app/shared/services/vehicle/vehicle.model';
import { ParkingService } from 'src/app/shared/services/parking/parking.service';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';
import { VehicleService } from 'src/app/shared/services/vehicle/vehicle.service';

@Component({
  selector: 'app-assign-lot-owner',
  templateUrl: './assign-lot-owner.component.html',
  styleUrls: ['./assign-lot-owner.component.scss'],
  animations: [
    collapsedAnimation
  ]
})
export class AssignLotOwnerComponent implements OnInit, OnDestroy {

  // Input
  @Input() parkingId!: number

  // Data
  residents$?: Observable<Resident[]>
  residentInput$: Subject<string> = new Subject<string>()
  selectedResident: Resident | undefined
  vehicles: Vehicle[] = []
  selectedVehicle: Vehicle | undefined
  vehicleType = VehicleType
  currentStep: number = 0

  // Form
  assignForm: FormGroup = new FormGroup({
    resident: new FormControl(null),
    vehicle: new FormControl(null)
  })
  addForm: FormGroup = new FormGroup({
    plateNo: new FormControl(null),
    vehicleType: new FormControl(null),
    resident: new FormControl(null)
  })
  formMessages = {
    plateNo: [
      { type: 'required', message: 'Field is required' }
    ],
    vehicleType: [
      { type: 'required', message: 'Field is required' }
    ]
  }

  // Checker
  isProcessing: boolean = false
  isSearching: boolean = false
  isAddVehicle: boolean = false

  // Subscription
  subscription: Subscription = new Subscription
  
  // Event
  @Output() changedEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private parkingSvc: ParkingService,
    private residentSvc: ResidentsService,
    private vehicleSvc: VehicleService
  ) { }

  ngOnInit(): void {
    this.searchResident()
    this.initAssignForm()
    this.initAddForm()
  }

  ngOnDestroy(): void {
    // Unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initAssignForm() {
    this.assignForm = this.fb.group({
      resident: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      vehicle: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  initAddForm() {
    this.addForm = this.fb.group({
      plateNo: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      vehicleType: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      resident: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  searchResident() {
    this.residents$ = concat(
      of([]), // Default value,
      this.residentInput$.pipe(
        filter(res => {
          return res !== null && res.length >= 3
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => this.isSearching = true),
        switchMap(term => {
          return this.residentSvc.search(term).pipe(
            catchError(() => of([])), // Empty of error
            tap(() => this.isSearching = false)
          )
        })
      )
    )
  }

  onSelectResident(resident: Resident) {
    // Assign resident to form
    this.selectedResident = resident
    this.assignForm.controls['resident'].setValue(this.selectedResident.id)
    
    // Reset vehicle field
    this.selectedVehicle = undefined
    this.assignForm.controls['vehicle'].setValue(null)
  }

  nextStep() {
    this.currentStep = this.currentStep + 1

    if (this.currentStep === 1) {
      // Retrieve resident's vehicles
      this.getVehicles()

      // Reset and update form value
      this.resetForm()
    }
  }

  getVehicles() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    this.subscription.add(
      this.vehicleSvc.list(`resident=${this.selectedResident?.id!}`).subscribe({
        next: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').complete()
        },
        error: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').stop()
        },
        complete: () => {
          this.vehicles = this.vehicleSvc.vehicles
        }
      }))
  }

  toggleAddVehicle() {
    this.isAddVehicle = !this.isAddVehicle

    // Enable / disable vehicle field
    if (this.isAddVehicle) {
      this.assignForm.controls['vehicle'].disable()
    } else {
      this.assignForm.controls['vehicle'].enable()
    }
  }

  addVehicle() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    this.subscription.add(
      this.vehicleSvc.create(this.addForm.value).subscribe({
        next: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').complete()

          this.notifySvc.success(
            'Success', 
            'Vehicle has been added to resident'
          )
        },
        error: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').stop()
        },
        complete: () => {
          // Refresh vehicle data
          this.getVehicles()

          // Reset form and disable add vehicle
          this.resetForm()

          // Toggle
          this.toggleAddVehicle()
        }
      }))
  }

  onSelectVehicle(vehicle: Vehicle) {
    // Assign vehicle to form
    this.selectedVehicle = vehicle
  }

  assignOwner() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    this.subscription.add(this.parkingSvc.assignResident(
      this.parkingId,
      this.assignForm.value
    ).subscribe({
      next: () => {
        this.isProcessing = false
        this.loadingBar.useRef('http').complete()

        this.notifySvc.success(
          'Success', 
          'Owner has been assigned to this parking'
        )
      },
      error: (err) => {
        this.isProcessing = false
        this.loadingBar.useRef('http').stop()

        if (err.status === 403 && 'detail' in err.error) {
          this.notifySvc.error(
            'Error', 
            err.error.detail
          )
        }
      },
      complete: () => {
        this.changedEvent.emit(true)
      }
    }))
  }

  cancelAssign() {
    this.cancelEvent.emit(true)
  }

  resetForm() {
    // Reset and update form value
    this.addForm.reset()
    this.initAddForm()
    this.addForm.controls['resident'].setValue(this.selectedResident?.id!)
  }

}
