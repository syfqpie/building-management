export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    iconType: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES_ADMIN: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    iconType: 'fas fa-home'
  },
  {
    path: '/admin/proprietors',
    title: 'Proprietors',
    type: 'link',
    iconType: 'fas fa-users'
  },
  {
    path: '/admin/units-management',
    title: 'Billings Management',
    type: 'sub',
    iconType: 'fas fa-file-invoice',
    collapse: 'billing',
    isCollapsed: false,
    isCollapsing: false,
    children: [
      { path: 'billings', title: 'Billings', type: 'link' },
      { path: 'invoices', title: 'Invoices', type: 'link' },
      { path: 'configurations', title: 'Configurations', type: 'link' }
    ]
  },
  {
    path: '/admin/units-management',
    title: 'Units Management',
    type: 'sub',
    iconType: 'fas fa-building',
    collapse: 'management',
    isCollapsed: false,
    isCollapsing: false,
    children: [
      { path: 'units', title: 'Units', type: 'link' },
      { path: 'configurations', title: 'Configurations', type: 'link' }
    ]
  },
  {
    path: '/admin/reports',
    title: 'Reporting',
    type: 'link',
    iconType: 'fas fa-chart-bar'
  },
  {
    path: '/admin/management',
    title: 'System Management',
    type: 'sub',
    iconType: 'fas fa-server',
    collapse: 'management',
    isCollapsed: false,
    isCollapsing: false,
    children: [
      { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
      { path: 'users', title: 'User', type: 'link' }
    ]
  },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    iconType: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    iconType: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTES_PUBLIC: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    iconType: 'fas fa-desktop text-warning'
  },
  {
    path: '/applications',
    title: 'Applications',
    type: 'link',
    iconType: 'fas fa-file-invoice text-pink'
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    iconType: 'fas fa-home text-purple'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    iconType: 'fas fa-tasks text-red'
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    iconType: 'fas fa-chart-bar text-green'
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    iconType: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    iconType: 'fas fa-braille text-indigo'
  }/*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    iconType: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    iconType: 'fas fa-sliders-h text-blue'
  }*/
];