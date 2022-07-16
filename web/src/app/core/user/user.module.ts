import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { UserRoutes } from './user.routing';
import { AboutSystemComponent } from './about-system/about-system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { TestComponent } from './test/test.component';
import { UnitsComponent } from './units/units.component';
import { UnitsConfigurationComponent } from './units-configuration/units-configuration.component';

// Child components
import { AccountSettingsComponent } from 'src/app/components/settings/account-settings/account-settings.component';
import { PasswordSettingsComponent } from 'src/app/components/settings/password-settings/password-settings.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    TestComponent,
    UnitsComponent,
    UnitsConfigurationComponent,
    AboutSystemComponent,
    SystemAdminComponent,
    // Child components
    AccountSettingsComponent,
    PasswordSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes),
    // 3rd party
    NgxDatatableModule
  ]
})
export class UserModule { }
