import { ParentItems } from './menu.model';

export const ROUTES: ParentItems[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        iconType: 'fas fa-home'
    },
    {
        path: '/management/units',
        title: 'Units Management',
        type: 'sub',
        iconType: 'fas fa-building',
        collapse: 'billing',
        isCollapsed: false,
        isCollapsing: false,
        children: [
            { path: '', title: 'Units', type: 'link' },
            { path: 'configuration', title: 'Configurations', type: 'link' }
        ]
    }
]