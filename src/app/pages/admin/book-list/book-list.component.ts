import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookUploadService } from './../book-upload/book-upload.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = []; // Array to hold all books
  searchQuery: string = ''; // Search query string
  currentPage: number = 1; // Current page for pagination
  recordsPerPage: number = 5; // Number of records per page
  errorMessage: string | null = null; // Error message
  Math = Math;

  constructor(private bookService: BookUploadService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // Fetch all books
  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.errorMessage = 'Failed to fetch books.';
      },
    });
  }

  // Handle search functionality
  handleSearch(): void {
    if (!this.searchQuery.trim()) {
      this.getBooks(); // Reset to all books if query is empty
      return;
    }

    const filteredBooks = this.books.filter(
      (book) =>
        book.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.books = filteredBooks;
  }

  // Delete a book by ID
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          alert('Book deleted successfully!');
          this.getBooks(); // Refresh book list
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete book. Please try again.');
        },
      });
    }
  }

  updateBook(book: any) {
    this.router.navigate(['/admin/book-upload'], { state: { book, isEdit: true } });
  }

  // Pagination logic
  get paginatedBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    return this.books.slice(startIndex, startIndex + this.recordsPerPage);
  }

  prePage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.books.length / this.recordsPerPage)) {
      this.currentPage++;
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  
}
