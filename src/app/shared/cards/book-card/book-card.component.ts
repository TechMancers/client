import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book-card/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit {

  @Input() book: any;
  @Input() userId!: string;
  router: any;

  goToPreview(book: any) {
    this.router.navigate(['/login', book.book_id]);

  }
  addToCart(arg0: any) {
    throw new Error('Method not implemented.');
  }
 
  constructor( private bookService:BookService) {}

  ngOnInit(): void {
    console.log('Book page');
    console.log('Books:', this.book);
  }
  addCart(book: any) {

    this.bookService.addItem(this.userId, book.book_id) // Replace '1' with the actual user_id
      .subscribe(
        response => {
          console.log('Item added to cart:', response);
        },
        error => {
          console.error('Error adding item to cart:', error);
        }
      );

}
}
// goToPreview(art: any) {
//   this.router.navigate(['/preview', art.artwork_id]);
//   console.log('art', art.artwork_id);
// }