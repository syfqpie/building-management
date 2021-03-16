import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { Complaint } from 'src/app/shared/services/complaints/complaints.model';
import { ComplaintsService } from 'src/app/shared/services/complaints/complaints.service';
import { Proprietor } from 'src/app/shared/services/proprietors/proprietors.model';
import { ProprietorsService } from 'src/app/shared/services/proprietors/proprietors.service';
import { UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-unit-information',
  templateUrl: './unit-information.component.html',
  styleUrls: ['./unit-information.component.scss']
})
export class UnitInformationComponent implements OnInit {

  // Data
  id
  unit: UnitExtended
  proprietors: Proprietor[] = []
  complaints: Complaint[] = []

  // Subscription
  subscription: Subscription

  constructor(
    private unitService: UnitsService,
    private proprietorService: ProprietorsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.id = this.route.snapshot.queryParamMap.get('id')
    if (!this.id) {
      this.navigate('/admin/units-management/units')
    }

    if (
      this.id && (
        typeof this.id === 'string' || 
        this.id instanceof String
      )
    ) {
      this.getData()
      this.initForm()
    }
    else {
      this.navigate('/admin/units-management/units')
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    forkJoin([
      this.unitService.getOne(this.id),
      this.proprietorService.getAll()
    ]).subscribe(
      () => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.unit = this.unitService.unitExtended
        this.proprietors = this.proprietorService.proprietors
        this.complaints = this.unitService.unitExtended['unit_complaints']
      },
      () => {
        // Unsuccess
        this.loadingBar.useRef('http').complete()
      },
      () => {}
    )
  }

  initForm() {

  }

  navigate(path) {
    return this.router.navigate([path])
  }

}
