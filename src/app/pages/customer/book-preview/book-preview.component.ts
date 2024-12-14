import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookPreviewService } from './book-preview.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css']
})
export class BookPreviewComponent implements OnInit, OnDestroy {
  
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
    // Subscribe to route parameters to detect changes in the book_id
    this.routeSub = this.route.params.subscribe(params => {
      this.book_id = params['book_id'];
      this.fetchBookDetails();
      this.fetchRelatedBooks();
      this.updateColumns();
    });
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

  columns: any[][] = [[], [], []];
  currentIndex = 0;
  itemWidth = 25;
  gap = 16;

  fetchRelatedBooks(): void {
    this.bookPreviewService.getRelatedBooks(this.book_id).subscribe(
      (response) => {
        if (response.success) {
          this.relatedBooks = response.data;
          console.log(this.relatedBooks);
          this.updateColumns();  // Make sure to update the columns after fetching related books
        } else {
          console.error('Failed to fetch related books', response.message);
        }
      }
    );
  }

  viewBook(book_id: string): void {
    this.router.navigate(['/book-preview', book_id]);  
  }

  updateColumns() {
    console.log('related is here');
    const width = window.innerWidth;

    let numColumns = 3;
    if (width < 600) {
      numColumns = 1;
    } else if (width < 992) {
      numColumns = 2;
    }

    this.columns = Array.from({ length: numColumns }, () => []);
    this.relatedBooks.forEach((image, index) => {
      console.log('image', image, index % numColumns);
      this.columns[index % numColumns].push(image);
    });
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

  addCart(bookDetails:any): void {
    alert('Book added to cart');
  }
}
