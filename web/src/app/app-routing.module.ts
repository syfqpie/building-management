import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/handlers/guards/auth.guard';
import { CurrentUserResolver } from './shared/handlers/resolvers/current-user.resolver';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/management/units', pathMatch: 'full' },
  {
    path: '',
    component: UserLayoutComponent,
    resolve: { CurrentUserResolver },
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        data: { roles: [1, 2] },
        loadChildren: () => import('./core/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  // Wildcard for error
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
