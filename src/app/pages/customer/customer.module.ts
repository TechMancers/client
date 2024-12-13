import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { PurchaseHistoryComponent } from './purchase-history-card/purchase-history.component';
import { BookCardComponent } from '../../shared/cards/book-card/book-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    CustomerProfileComponent,
    EditProfileComponent,
    SearchBookComponent,
    PurchaseHistoryComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule
  ]
})
export class CustomerModule { }
