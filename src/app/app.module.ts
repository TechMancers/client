import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminModule } from './pages/admin/admin.module';
import { CustomerModule } from './pages/customer/customer.module';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NewPasswordComponent } from './pages/forgot-password/new-password/new-password.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';
import { St01Component } from './pages/sign-up/sign-up-users/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-users/st02/st02.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NewPasswordComponent,
    ResetPasswordComponent,
    St01Component,
    St02Component,
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CustomerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
