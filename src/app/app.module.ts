import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NewPasswordComponent } from './pages/forgot-password/new-password/new-password.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';
import { St01Component } from './pages/sign-up/sign-up-users/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-users/st02/st02.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CategoryCardComponent } from './shared/cards/category/category-card/category-card.component';
// import { BookCardComponent } from './shared/cards/book-card/book-card.component';
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
