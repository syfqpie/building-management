import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { UserRoutes } from './user.routing';
import { AboutSystemComponent } from './about-system/about-system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { RentersComponent } from './renters/renters.component';
import { RenterDetailComponent } from './renter-detail/renter-detail.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { TestComponent } from './test/test.component';
import { UnitsComponent } from './units/units.component';
import { UnitsConfigurationComponent } from './units-configuration/units-configuration.component';

// Child components
import { AccountSettingsComponent } from 'src/app/components/settings/account-settings/account-settings.component';
import { BlocksTableComponent } from 'src/app/components/units/blocks-table/blocks-table.component';
import { FloorsTableComponent } from 'src/app/components/units/floors-table/floors-table.component';
import { NotAuthorizedComponent } from 'src/app/components/errors/not-authorized/not-authorized.component';
import { PasswordSettingsComponent } from 'src/app/components/settings/password-settings/password-settings.component';
import { RenterRegistrationComponent } from 'src/app/components/renters/renter-registration/renter-registration.component';
import { SysRegisterAdminComponent } from 'src/app/components/system-admin/sys-register-admin/sys-register-admin.component';
import { UnitAddComponent } from '../../components/units/unit-add/unit-add.component';
import { UnitNumbersTableComponent } from 'src/app/components/units/unit-numbers-table/unit-numbers-table.component';

// Basic components
import { BaseModalComponent } from 'src/app/components/custom/base-modal/base-modal.component';

// Pipes
import { GenderTypePipe } from 'src/app/shared/handlers/pipes/gender-type.pipe';
import { TitleTypePipe } from 'src/app/shared/handlers/pipes/title-type.pipe';

// 3rd party
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    TestComponent,
    UnitsComponent,
    UnitsConfigurationComponent,
    AboutSystemComponent,
    RentersComponent,
    RenterDetailComponent,
    RenterRegistrationComponent,
    SystemAdminComponent,
    // Child components
    AccountSettingsComponent,
    BlocksTableComponent,
    FloorsTableComponent,
    NotAuthorizedComponent,
    PasswordSettingsComponent,
    SysRegisterAdminComponent,
    UnitAddComponent,
    UnitNumbersTableComponent,
    // Reusable components
    BaseModalComponent,
    GenderTypePipe,
    TitleTypePipe
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
