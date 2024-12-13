import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { PurchaseHistoryComponent } from './purchase-history-card/purchase-history.component';

const routes: Routes = [{ path: 'cart', component: CartComponent },
  { path: 'customer-profile', component: CustomerProfileComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'purchase-history', component: PurchaseHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
