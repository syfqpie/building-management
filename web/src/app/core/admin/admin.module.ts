import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantInformationComponent } from './tenant-information/tenant-information.component';
import { ManagementAuditTrailsComponent } from './management-audit-trails/management-audit-trails.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ManagementUnitsComponent } from './management-units/management-units.component';
import { ManagementUnitsConfigurationsComponent } from './management-units-configurations/management-units-configurations.component';
import { ConfigurationBlocksComponent } from './components/configuration-blocks/configuration-blocks.component';
import { ConfigurationFloorsComponent } from './components/configuration-floors/configuration-floors.component';
import { ConfigurationUnitNumbersComponent } from './components/configuration-unit-numbers/configuration-unit-numbers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitInformationComponent } from './unit-information/unit-information.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ReportsComponent,
    TenantsComponent,
    TenantInformationComponent,
    ManagementAuditTrailsComponent,
    ManagementUsersComponent,
    ManagementUnitsComponent,
    ManagementUnitsConfigurationsComponent,
    ConfigurationBlocksComponent,
    ConfigurationFloorsComponent,
    ConfigurationUnitNumbersComponent,
    UnitInformationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
