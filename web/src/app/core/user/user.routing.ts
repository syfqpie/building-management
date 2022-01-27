import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { TestComponent } from './test/test.component';
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
                        path: 'configuration',
                        component: UnitsConfigurationComponent
                    }
                ]
            }
        ]
    }
]