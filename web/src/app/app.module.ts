import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// Layout
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserNavbarComponent } from './components/navbars/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './components/sidebars/user-sidebar/user-sidebar.component';
import { UserFooterComponent } from './components/footers/user-footer/user-footer.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

// 3rd party
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpTokenInterceptor } from './shared/interceptors/http.token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    UserFooterComponent,
    UserLayoutComponent,
    PublicLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    // 3rd
    LoadingBarModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
