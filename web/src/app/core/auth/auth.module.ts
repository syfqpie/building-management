import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    VerifyAccountComponent,
    ResendVerificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    SharedModule
  ]
})
export class AuthModule { }
