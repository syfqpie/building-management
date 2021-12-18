import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexDropdownComponent } from './dropdowns/index-dropdown/index-dropdown.component';
import { NotificationDropdownComponent } from './dropdowns/notification-dropdown/notification-dropdown.component';
import { PagesDropdownComponent } from './dropdowns/pages-dropdown/pages-dropdown.component';
import { TableDropdownComponent } from './dropdowns/table-dropdown/table-dropdown.component';
import { UserDropdownComponent } from './dropdowns/user-dropdown/user-dropdown.component';
import { FooterComponent } from './footers/footer/footer.component';
import { FooterAdminComponent } from './footers/footer-admin/footer-admin.component';
import { FooterSmallComponent } from './footers/footer-small/footer-small.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { AuthNavbarComponent } from './navbars/auth-navbar/auth-navbar.component';
import { IndexNavbarComponent } from './navbars/index-navbar/index-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // Dropdown
    IndexDropdownComponent,
    NotificationDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    UserDropdownComponent,
    // Footer
    FooterComponent,
    FooterAdminComponent,
    FooterSmallComponent,
    // Navbar
    AdminNavbarComponent,
    AuthNavbarComponent,
    IndexNavbarComponent,
    // Sidebar
    SidebarComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class ComponentsModule {}
