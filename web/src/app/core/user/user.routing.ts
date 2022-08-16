import { Routes } from '@angular/router';
import { NotAuthorizedComponent } from 'src/app/components/errors/not-authorized/not-authorized.component';
import { AboutSystemComponent } from './about-system/about-system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResidentDetailComponent } from './resident-detail/resident-detail.component';
import { ResidentsComponent } from './residents/residents.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { TestComponent } from './test/test.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketsOverviewComponent } from './tickets-overview/tickets-overview.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UnitActivitiesComponent } from './unit-activities/unit-activities.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitsConfigurationComponent } from './units-configuration/units-configuration.component';
import { UnitsComponent } from './units/units.component';

export const UserRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: 'management',
        children: [
            {
                path: 'units',
                children: [
                    {
                        path: '',
                        component: UnitsComponent
                    },
                    {
                        path: 'detail/:id',
                        component: UnitDetailComponent
                    },
                    {
                        path: 'configuration',
                        component: UnitsConfigurationComponent
                    },
                    {
                        path: 'activities',
                        component: UnitActivitiesComponent
                    }
                ]
            },
            {
                path: 'residents',
                children: [
                    {
                        path: '',
                        component: ResidentsComponent
                    },
                    {
                        path: 'detail/:id',
                        component: ResidentDetailComponent
                    }
                ]
            },
            {
                path: 'tickets',
                children: [
                    {
                        path: '',
                        component: TicketsComponent
                    },
                    {
                        path: 'overview',
                        component: TicketsOverviewComponent
                    },
                    {
                        path: 'detail/:id',
                        component: TicketDetailComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'system-admin',
        component: SystemAdminComponent
    },
    {
        path: 'about-system',
        component: AboutSystemComponent
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent
    }
]