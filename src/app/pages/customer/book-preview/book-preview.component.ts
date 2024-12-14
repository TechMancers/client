// book-preview.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookPreviewService } from './book-preview.service';
import { Subject, Subscription } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css']
})
export class BookPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  
  thumbnail: string = '';
  
  book_id!: string;
  bookDetails: any = {};
  relatedBooks: any[] = [];
  comments: any[] = [];
  newComment: string = '';
  userId: string = 'Cu-00001'; 
  private destroy$ = new Subject<void>();

  isAddedToWish: boolean = false;
  addToWishButtonText: string = 'Add to Wish-List';
  addToWishButtonClass: string = 'add-to-wish';

  routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookPreviewService: BookPreviewService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.book_id = params['book_id'];
    });
  }

  ngAfterViewInit(): void {
      this.fetchBookDetails();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchBookDetails(): void {
    this.bookPreviewService.getBookDetails(this.book_id).subscribe(
      (response) => {
        if (response.success) {
          this.bookDetails = response.data;
          this.thumbnail = response.data.cover_image;
        } else {
          console.error('Failed to fetch book details', response.message);
        }
      },
      error => {
        console.error('Error fetching book details', error);
      }
    );
  }

  toggleAddToWish(): void {
    const action = this.isAddedToWish ? this.bookPreviewService.removeFromWishlist(this.book_id, this.userId) : this.bookPreviewService.addToWishlist(this.book_id, this.userId);
    action.subscribe(
      () => {
        this.isAddedToWish = !this.isAddedToWish;
        this.addToWishButtonText = this.isAddedToWish ? 'Remove from Wish-List' : 'Add to Wish-List';
        this.addToWishButtonClass = this.isAddedToWish ? 'remove-from-wish' : 'add-to-wish';
      }
    )
  }

  addCart(bookDetails: any){
  }

  fetchRelatedBooks(): void {
    this.bookPreviewService.getRelatedBooks(this.book_id).subscribe(
      (response) => {
        if (response.success) {
          this.relatedBooks = response.data;
        } else {
          console.error('Failed to fetch related books', response.message);
        }
      }
    );
  }

  fetchComments(): void {
    this.bookPreviewService.getComments(this.book_id).subscribe(
      data => this.comments = data,
      error => console.error('Error fetching comments', error)
    );
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.bookPreviewService.postComment(this.book_id, this.userId, this.newComment).subscribe(
        data => {
          this.comments.push(data);
          this.newComment = '';
        },
        error => console.error('Error posting comment', error)
      );
    }
  }

  addToWishlist(): void {
    this.bookPreviewService.addToWishlist(this.book_id, this.userId).subscribe(
      () => alert('Book added to wishlist'),
      error => console.error('Error adding to wishlist', error)
    );
  }

  removeFromWishlist(): void {
    this.bookPreviewService.removeFromWishlist(this.book_id, this.userId).subscribe(
      () => alert('Book removed from wishlist'),
      error => console.error('Error removing from wishlist', error)
    );
  }
}
