import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './shared/interceptor/http.token.interceptor';
import { RouterModule } from '@angular/router';

// 3rd party
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { NgxCoolDialogsModule } from '@csiro-geoanalytics/ngx-cool-dialogs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layouts
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

// Components
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { FooterSmallComponent } from './components/footers/footer-small/footer-small.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';

// auth views
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

// no layouts views
import { IndexComponent } from './views/index/index.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProfileComponent } from './views/profile/profile.component';

// Examples
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { IndexNavbarComponent } from './components/navbars/index-navbar/index-navbar.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { PagesDropdownComponent } from './components/dropdowns/pages-dropdown/pages-dropdown.component';
import { NotificationDropdownComponent } from './components/dropdowns/notification-dropdown/notification-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,

    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LoadingBarModule,
    // NgxCoolDialogsModule.forRoot({
    //   theme: 'default', // available themes: 'default' | 'material' | 'dark'
    //   okButtonText: 'Confirm',
    //   cancelButtonText: 'Cancel',
    //   titles: {
    //     alert: 'Warning',
    //     confirm: 'Confirmation',
    //     prompt: 'Alert'
    //   }
    // }),
    NgxDatatableModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    /* Uncomment this to use interceptor*/
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
