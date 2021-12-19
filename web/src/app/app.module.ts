import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpTokenInterceptor } from './shared/interceptor/http.token.interceptor';

// 3rd part
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SystemComponent } from './layouts/system/system.component';
import { UserNavbarComponent } from './components/navbars/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './components/sidebars/user-sidebar/user-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SystemComponent,
    UserNavbarComponent,
    UserSidebarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // 3rd party
    LoadingBarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      timeOut: 5000
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
