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

@NgModule({
  declarations: [
    DashboardComponent,
    ReportsComponent,
    TenantsComponent,
    TenantInformationComponent,
    ManagementAuditTrailsComponent,
    ManagementUsersComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
