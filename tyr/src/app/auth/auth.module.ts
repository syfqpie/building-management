import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent
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
