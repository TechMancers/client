import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchBookComponent } from './search-book/search-book.component';



const routes: Routes = [{ path: 'cart', component: CartComponent },
  { path: 'customer-profile', component: CustomerProfileComponent},
  { path: 'edit-profile/:userId', component: EditProfileComponent},
  { path: 'search-book', component: SearchBookComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
