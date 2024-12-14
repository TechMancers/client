import { BookUploadService } from './../book-upload/book-upload.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: any[] = []; // Array to hold all books
  errorMessage: string | null = '';
constructor(private bookService:BookUploadService){}



  ngOnInit():void{
    this.getBooks();

  }


getBooks() {
  this.bookService.getBooks().subscribe({
    next: (data) => {
      console.log('Books:', data); // Log to inspect data
      this.books = data;
    },
    error: (err) => {
      console.error('Error fetching books:', err);
      this.errorMessage = 'Failed to fetch books.';
    }
  });
}

deleteBook(bookId: string) {
  if (confirm('Are you sure you want to delete this book?')) {
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        alert('Book deleted successfully!');
        this.getBooks(); // Refresh the book list after deletion
      },
      error: (err) => {
        console.error('Error deleting book:', err);
        alert('Failed to delete book. Please try again.');
      },
    });
  }}
  viewBook(bookId: string) {
    // Logic to view book details
    console.log('Viewing book details for:', bookId);
    // Redirect to book details page or show a modal/dialog
  }
}
