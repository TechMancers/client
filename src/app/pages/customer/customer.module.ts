import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CartCardComponent } from '../../shared/cards/cart-card/cart-card.component';
import { BookCardComponent } from '../../shared/cards/book-card/book-card.component';
import { CategoryCardComponent } from '../../shared/cards/category/category-card/category-card.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    CartComponent,
    FooterComponent,
    CartCardComponent,
    BookCardComponent,
    CheckoutFormComponent,
    HomeComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
