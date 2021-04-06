import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'reset',
                component: ResetComponent
            }
        ] 
    }
]