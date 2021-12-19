import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { SystemComponent } from './layouts/system/system.component';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  // Auth
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  // System
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/user/user.module').then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
