import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';
import { BookCardComponent } from './../../shared/cards/book-card/book-card.component';
import { CategoryCardComponent } from '../../shared/cards/category/category-card/category-card.component';

@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    BookCardComponent,
    CategoryCardComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
