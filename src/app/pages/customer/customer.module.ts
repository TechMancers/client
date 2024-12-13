import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { PurchaseHistoryComponent } from './purchase-history-card/purchase-history.component';




@NgModule({
  declarations: [
    CartComponent,
    CustomerProfileComponent,
    EditProfileComponent,
    SearchBookComponent,
    PurchaseHistoryComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
