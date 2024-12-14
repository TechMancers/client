import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';


const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'customer-profile', component: CustomerProfileComponent},
  { path: 'edit-profile/:userId', component: EditProfileComponent},
  { path: 'search-book', component: SearchBookComponent},
  { path: 'book-preview/:book_id', component: BookPreviewComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
