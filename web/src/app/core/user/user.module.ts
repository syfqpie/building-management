import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { UserRoutes } from './user.routing';
import { AboutSystemComponent } from './about-system/about-system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentDetailComponent } from './resident-detail/resident-detail.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { TestComponent } from './test/test.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketsOverviewComponent } from './tickets-overview/tickets-overview.component';
import { UnitsComponent } from './units/units.component';
import { UnitsConfigurationComponent } from './units-configuration/units-configuration.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';

// Child components
import { AccountSettingsComponent } from 'src/app/components/settings/account-settings/account-settings.component';
import { AddParkingComponent } from '../../components/parkings/add-parking/add-parking.component';
import { AddTicketComponent } from '../../components/tickets/add-ticket/add-ticket.component';
import { ActivityTimelineComponent } from '../../components/tickets/activity-timeline/activity-timeline.component';
import { AssignOwnerComponent } from '../../components/units/assign-owner/assign-owner.component';
import { AssignLotOwnerComponent } from '../../components/parkings/assign-lot-owner/assign-lot-owner.component';
import { BlocksTableComponent } from 'src/app/components/units/blocks-table/blocks-table.component';
import { FloorsTableComponent } from 'src/app/components/units/floors-table/floors-table.component';
import { NotAuthorizedComponent } from 'src/app/components/errors/not-authorized/not-authorized.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { ParkingDetailComponent } from './parking-detail/parking-detail.component';
import { PasswordSettingsComponent } from 'src/app/components/settings/password-settings/password-settings.component';
import { ResidentRegistrationComponent } from 'src/app/components/residents/resident-registration/resident-registration.component';
import { SysRegisterAdminComponent } from 'src/app/components/system-admin/sys-register-admin/sys-register-admin.component';
import { TicketCommentsComponent } from '../../components/tickets/ticket-comments/ticket-comments.component';
import { UnitActivitiesComponent } from './unit-activities/unit-activities.component';
import { UnitAddComponent } from '../../components/units/unit-add/unit-add.component';
import { UnitNumbersTableComponent } from 'src/app/components/units/unit-numbers-table/unit-numbers-table.component';
import { UnitResidentsComponent } from '../../components/units/unit-residents/unit-residents.component';
import { UpdateTicketStatusComponent } from '../../components/tickets/update-ticket-status/update-ticket-status.component';

// Reusable
import { ActivityTypePipe } from 'src/app/shared/handlers/pipes/activity-type.pipe';
import { GenderTypePipe } from 'src/app/shared/handlers/pipes/gender-type.pipe';
import { TicketStatusPipe } from '../../shared/handlers/pipes/ticket-status.pipe';
import { TicketPriorityPipe } from '../../shared/handlers/pipes/ticket-priority.pipe';
import { TicketCategoryPipe } from '../../shared/handlers/pipes/ticket-category.pipe';
import { TitleTypePipe } from 'src/app/shared/handlers/pipes/title-type.pipe';

// 3rd party
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AboutSystemComponent,
    DashboardComponent,
    ResidentsComponent,
    ResidentDetailComponent,
    ResidentRegistrationComponent,
    SettingsComponent,
    SystemAdminComponent,
    TestComponent,
    TicketsComponent,
    TicketDetailComponent,
    TicketsOverviewComponent,
    UnitsComponent,
    UnitsConfigurationComponent,
    UnitDetailComponent,
    // Child components
    AccountSettingsComponent,
    AddParkingComponent,
    AddTicketComponent,
    ActivityTimelineComponent,
    AssignOwnerComponent,
    AssignLotOwnerComponent,
    BlocksTableComponent,
    FloorsTableComponent,
    NotAuthorizedComponent,
    ParkingsComponent,
    ParkingDetailComponent,
    PasswordSettingsComponent,
    SysRegisterAdminComponent,
    TicketCommentsComponent,
    UnitActivitiesComponent,
    UnitAddComponent,
    UnitNumbersTableComponent,
    UnitResidentsComponent,
    UpdateTicketStatusComponent,
    // Reusable components
    ActivityTypePipe,
    GenderTypePipe,
    TicketStatusPipe,
    TicketPriorityPipe,
    TicketCategoryPipe,
    TitleTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes),
    // 3rd party
    NgxChartsModule,
    NgxDatatableModule,
    NgSelectModule
  ]
})
export class UserModule { }
