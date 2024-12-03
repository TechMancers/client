import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CartServiceService } from './services/cart-service.service';
import { CartItemService } from '../../shared/components/cards/arts/arts.service';

interface CartItem {
  book_id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail_url: string;
  author_name: string;
  user_id: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalQuantity: number = 0;
  subTotal: number = 0;
  cartItems: CartItem[] = [];
  //userId:string = localStorage.getItem('user_id') || '';
  userId: string = '1'; // Replace with dynamic user ID


  constructor(
    private router: Router,
    //private cartService: CartServiceService,
    private cartItemService: CartItemService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = this.userId; // Replace with dynamic user ID
    this.cartItemService.getCartItems(userId).subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.updateCartSummary();
      console.log('Cart items:', items);
    });
  }

  updateCartSummary() {
    this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.subTotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  onItemChanged() {
    this.updateCartSummary();
  }

  onItemRemoved(bookId: number) {
    this.cartItems = this.cartItems.filter(item => item.book_id !== bookId);
    this.updateCartSummary();
  }

  removeAll() {
    console.log('Clearing cart');
    const userId = this.userId; // Replace with dynamic user ID
    this.cartItemService.clearCart(this.userId).subscribe(
      () => {
        console.log('All items removed from cart');
        this.cartItems = [];
        this.totalQuantity = 0;
        this.subTotal = 0;
      },
      (error) => {
        console.error('Error clearing cart:', error);
      }
    );
  }
  checkout() {
    this.router.navigate(['/checkout'], { queryParams: { subtotal: this.subTotal, quantity: this.totalQuantity } });
  }

}
