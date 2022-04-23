import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 3rd party
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';


// Components
import { UserRoutes } from './user.routing';
import { BlocksTableComponent } from '../../components/users/blocks-table/blocks-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FloorsTableComponent } from '../../components/users/floors-table/floors-table.component';
import { SettingsComponent } from './settings/settings.component';
import { TestComponent } from './test/test.component';
import { UnitsComponent } from './units/units.component';
import { UnitsConfigurationComponent } from './units-configuration/units-configuration.component';
import { UnitNumbersTableComponent } from '../../components/users/unit-numbers-table/unit-numbers-table.component';
import { IsActivePipe } from 'src/app/shared/handlers/pipes/is-active.pipe';

@NgModule({
  declarations: [
    BlocksTableComponent,
    DashboardComponent,
    FloorsTableComponent,
    SettingsComponent,
    TestComponent,
    UnitsComponent,
    UnitsConfigurationComponent,
    UnitNumbersTableComponent,

    // Pipe
    IsActivePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes),
    SkeletonModule,
    TableModule,
    TabViewModule
  ]
})
export class UserModule { }
