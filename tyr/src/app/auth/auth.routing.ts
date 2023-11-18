import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ResetComponent } from './reset/reset.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';

export const AuthRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'resend-verification',
				component: ResendVerificationComponent,
				data: {
					title: 'Resend verification'
				}
			},
			{
				path: 'reset',
				component: ResetComponent,
				data: {
					title: 'Reset'
				}
			},
			{
				path: 'verify-account',
				component: VerifyAccountComponent,
				data: {
					title: 'Verify account'
				}
			}
		]
	}
]