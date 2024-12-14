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
import { SearchBookComponent } from './search-book/search-book.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { PurchaseHistoryComponent } from './purchase-history-card/purchase-history.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';

import { CommentComponent } from '../../shared/components/comments/comment/comment.component';
import { CommentListComponent } from '../../shared/components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from '../../shared/components/comments/comment-form/comment-form.component';
import { CommentsService } from '../../shared/services/comments.service';


@NgModule({
  declarations: [
    NavbarComponent,
    CartComponent,
    FooterComponent,
    CartCardComponent,
    BookCardComponent,
    CheckoutFormComponent,
    HomeComponent,
    CategoryCardComponent,
    SearchBookComponent,
    EditProfileComponent,
    PurchaseHistoryComponent,
    CustomerProfileComponent,
    BookPreviewComponent,
    CommentComponent,
    CommentListComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [CommentsService],
})
export class CustomerModule { }
