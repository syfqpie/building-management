import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Default
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Layout
import { UserNavbarComponent } from './components/navbars/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './components/sidebars/user-sidebar/user-sidebar.component';
import { UserFooterComponent } from './components/footers/user-footer/user-footer.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { RouterModule } from '@angular/router';

// 3rd party
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpTokenInterceptor } from './shared/interceptors/http.token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    UserFooterComponent,
    UserLayoutComponent,
    PublicLayoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // 3rd
    LoadingBarModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
