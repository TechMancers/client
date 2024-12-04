import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';


@NgModule({
  declarations: [
    CartComponent,
    CustomerProfileComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
