import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditTrailsComponent } from './management-audit-trails/management-audit-trails.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { ReportsComponent } from './reports/reports.component';
import { TenantInformationComponent } from './tenant-information/tenant-information.component';
import { TenantsComponent } from './tenants/tenants.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditTrailsComponent
                    },
                    {
                        path: 'users',
                        component: ManagementUsersComponent
                    }
                ]
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
            {
                path: 'tenants',
                children: [
                    {
                        path: '',
                        component: TenantsComponent
                    },
                    {
                        path: 'information',
                        component: TenantInformationComponent
                    }
                ]
            }
        ]
    }
]