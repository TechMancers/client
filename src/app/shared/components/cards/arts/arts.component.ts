// src/app/arts/arts.component.ts
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
//import { CartServiceService } from '../../../pages/cart/services/cart-service.service';
//import { isPlatformBrowser } from '@angular/common';
import { CartItemService } from './arts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent {
  @Input() book: any;
  @Input() userId!: string;
  //private isBrowser: boolean;

  constructor(//private cartService: CartServiceService,
  private cartItemService: CartItemService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    //this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Check if the artwork is liked by the current user
    if (this.book && this.userId) {
      this.checkLikedStatus();
    }
    console.log(this.book, 'arts in arts component');
  }
  addCart(book: any) {

      this.cartItemService.addItem(this.userId, book.book_id) // Replace '1' with the actual user_id
        .subscribe(
          response => {
            console.log('Item added to cart:', response);
          },
          error => {
            console.error('Error adding item to cart:', error);
          }
        );

  }
  checkLikedStatus() {
    this.cartItemService.getLikedStatus(this.userId, this.book.book_id)
      .subscribe(
        response => {
          this.book.liked = response.liked; // Update liked status for the artwork
          // this.art.total_likes = response.total_likes ||0; // Update total likes count
        },
        error => {
          console.error('Error fetching liked status:', error);
        }
      );
  }
  likeArtwork(book: any) {
    if (book.liked) {
      // Unlike artwork
      this.cartItemService.likeArtwork(this.userId, book.book_id)
        .subscribe(
          response => {
            console.log('Book unliked successfully', response);
            book.liked = false;
            // art.total_likes = response.total_likes ||0;
            book.total_likes -= 1;
          },
          error => {
            console.error('Error unliking book:', error);
          }
        );
    } else {
      // Like artwork
      this.cartItemService.likeArtwork(this.userId, book.book_id)
        .subscribe(
          response => {
            console.log('Book liked successfully', response);
            book.liked = true;
            // art.total_likes = response.total_likes || 0;
            book.total_likes += 1;
          },
          error => {
            console.error('Book liking artwork:', error);
          }
        );
    }
  }

  goToPreview(book: any) {
    this.router.navigate(['/preview', book.book_id]);
    console.log('art', book.book_id);
  }

  getTotalLikes() {
    this.cartItemService.getTotalLikes(this.book.book_id)
      .subscribe(
        response => {
          this.book.total_likes = response.total_likes ; // Update total likes count for the artwork
          console.log('Total likes:', response.total_likes);
        },
        error => {
          console.error('Error fetching total likes:', error);
        }
      );
  }
}
