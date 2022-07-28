import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription } from 'rxjs';

import { Resident } from 'src/app/shared/services/residents/residents.model';
import { ResidentsService } from 'src/app/shared/services/residents/residents.service';
import { Unit, UnitExtended } from 'src/app/shared/services/units/units.model';
import { UnitsService } from 'src/app/shared/services/units/units.service';

@Component({
  selector: 'app-assign-resident',
  templateUrl: './assign-resident.component.html',
  styleUrls: ['./assign-resident.component.scss']
})
export class AssignResidentComponent implements OnInit, OnDestroy {

  // Data
  searchedResidents: Resident[] = []
  selectedResident: Resident | undefined

  constructor(
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private unitSvc: UnitsService,
    private residentSvc: ResidentsService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      
  }

}
