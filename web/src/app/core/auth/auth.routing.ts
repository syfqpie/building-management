import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

export const AuthRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'resend-verification',
        component: ResendVerificationComponent
    },
    {
        path: 'reset',
        component: ResetComponent
    },
    {
        path: 'verify-account',
        component: VerifyAccountComponent
    }
]