import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';



@NgModule({
  declarations: [LoginComponent, ResetComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
