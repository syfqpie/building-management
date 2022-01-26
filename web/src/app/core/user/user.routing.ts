import { Routes } from '@angular/router';
import { UserLayoutComponent } from 'src/app/layouts/user-layout/user-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { TestComponent } from './test/test.component';

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
    }
]