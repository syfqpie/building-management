import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
      path: '',
      component: UserLayoutComponent,
      children: [
        {
          path: '',
          data: { roles: [1, 2, 3] },
          loadChildren: () => import('./core/user/user.module').then(m => m.UserModule)}
      ]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
