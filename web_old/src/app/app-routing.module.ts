import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layouts
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './public/home/home.component';

// auth views
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

// no layouts views
import { IndexComponent } from './views/index/index.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  // Admin layout
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin', loadChildren: './core/admin/admin.module#AdminModule'},
      { path: '', loadChildren: './core/global/global.module#GlobalModule'},
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    ],
  },
  // Auth layout
  {
    path: '',
    component: AuthComponent,
    children: [
      // { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
    ],
  },
  // No layout 
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'landing', component: LandingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
