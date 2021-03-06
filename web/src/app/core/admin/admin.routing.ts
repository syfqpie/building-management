import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditTrailsComponent } from './management-audit-trails/management-audit-trails.component';
import { ManagementUnitsConfigurationsComponent } from './management-units-configurations/management-units-configurations.component';
import { ManagementUnitsComponent } from './management-units/management-units.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { ProprietorInformationComponent } from './proprietor-information/proprietor-information.component';
import { ProprietorsComponent } from './proprietors/proprietors.component';
import { ReportsComponent } from './reports/reports.component';
import { TenantInformationComponent } from './tenant-information/tenant-information.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UnitInformationComponent } from './unit-information/unit-information.component';

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
                path: 'proprietors',
                children: [
                    {
                        path: '',
                        component: ProprietorsComponent
                    },
                    {
                        path: 'information',
                        component: ProprietorInformationComponent
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
            },
            {
                path: 'units-management',
                children: [
                    {
                        path: 'units',
                        children: [
                            {
                                path: '',
                                component: ManagementUnitsComponent
                            },
                            {
                                path: 'information',
                                component: UnitInformationComponent
                            }
                        ]
                    },
                    {
                        path: 'configurations',
                        component: ManagementUnitsConfigurationsComponent
                    }
                ]
            },
        ]
    }
]