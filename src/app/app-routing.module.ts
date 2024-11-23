import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { St01Component } from './pages/sign-up/sign-up-users/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-users/st02/st02.component';
import { St03Component } from './pages/sign-up/sign-up-users/st03/st03.component';

import { NewPasswordComponent } from './pages/forgot-password/new-password/new-password.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'st01', component: St01Component },
  { path: 'st02', component: St02Component },
  { path: 'st03', component: St03Component },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'new', component: NewPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
