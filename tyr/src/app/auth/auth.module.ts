import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';
import { ResetComponent } from './reset/reset.component';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		ResendVerificationComponent,
		ResetComponent,
		ResetConfirmComponent,
		ResetRequestComponent,
		VerifyAccountComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(AuthRoutes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	]
})
export class AuthModule { }
