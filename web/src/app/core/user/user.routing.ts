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
        component: DashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'settings',
        component: SettingsComponent,
        data: {
            title: 'Settings'
        }
    },
    {
        path: 'test',
        component: TestComponent,
        data: {
            title: 'Test'
        }
    },
    {
        path: 'management',
        children: [
            {
                path: 'units',
                children: [
                    {
                        path: '',
                        component: UnitsComponent,
                        data: {
                            title: 'Units'
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: UnitDetailComponent,
                        data: {
                            title: 'Unit detail'
                        }
                    },
                    {
                        path: 'configuration',
                        component: UnitsConfigurationComponent,
                        data: {
                            title: 'Unit configuration'
                        }
                    },
                    {
                        path: 'activities',
                        component: UnitActivitiesComponent,
                        data: {
                            title: 'Unit activities'
                        }
                    }
                ]
            },
            {
                path: 'residents',
                children: [
                    {
                        path: '',
                        component: ResidentsComponent,
                        data: {
                            title: 'Residents'
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: ResidentDetailComponent,
                        data: {
                            title: 'Resident detail'
                        }
                    }
                ]
            },
            {
                path: 'tickets',
                children: [
                    {
                        path: '',
                        component: TicketsComponent,
                        data: {
                            title: 'Tickets'
                        }
                    },
                    {
                        path: 'overview',
                        component: TicketsOverviewComponent,
                        data: {
                            title: 'Ticket overview'
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: TicketDetailComponent,
                        data: {
                            title: 'Ticket detail'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: 'system-admin',
        component: SystemAdminComponent,
        data: {
            title: 'System admin'
        }
    },
    {
        path: 'about-system',
        component: AboutSystemComponent,
        data: {
            title: 'About system'
        }
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
        data: {
            title: 'Not authorized'
        }
    }
]