import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

const routes: Routes = [{ path: 'cart', component: CartComponent },
  { path: 'customer-profile', component: CustomerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
