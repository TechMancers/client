import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookUploadService } from './book-upload.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrl: './book-upload.component.css'
})
export class BookUploadComponent implements OnInit{
  books: any[] = []; // Array to hold all books
  categories: any[] = []; // Array to hold all categories
  errorMessage: string = '';
  bookForm: any;
  successMessage: string | null = null;
  errorMessages: string | null = null;
  newErrorMessage: string | null = null;
  selectedBook: any = null;

  constructor(private bookService:BookUploadService, private fb:FormBuilder ){
    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', [Validators.required]]
    });
  }

  ngOnInit():void{
    this.getBooks();

  }

  viewBookDetails(bookId: string) {
    this.bookService.getBookById(bookId).subscribe({
      next: (data) => {
        this.selectedBook = data;  // Store the selected book details
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch book details.';
      }
    });
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
          this.successMessage = 'Book deleted successfully!';
          this.newErrorMessage = null;
          this.getBooks(); // Refresh the book list
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.errorMessage = 'Failed to delete book. Please try again.';
          this.successMessage = null;
        }
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response) => {
          console.log('Book added successfully:', response);
          this.successMessage = 'Book added successfully!';
          this.errorMessages = null;
          this.bookForm.reset();
        },
        error: (error) => {
          console.error('Error adding book:', error);
          this.errorMessage = 'Failed to add book. Please try again.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
      this.successMessage = null;
    }
  }
}









