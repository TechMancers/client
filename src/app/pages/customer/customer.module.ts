import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';
import { BookCardComponent } from './../../shared/cards/book-card/book-card.component';

@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
