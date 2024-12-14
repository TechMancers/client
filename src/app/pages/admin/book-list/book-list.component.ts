import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  recordsPerPage: number = 5;
  Math = Math; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.http.get('/api/books').subscribe(
      (response: any) => {
        this.books = response.booksList;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  handleSearch(): void {
    if (!this.searchQuery.trim()) {
      this.fetchBooks();
      return;
    }

    this.http
      .get('/api/books/search', { params: { query: this.searchQuery } })
      .subscribe(
        (response: any) => {
          this.books = response.books;
        },
        (error) => {
          console.error('Error searching books:', error);
        }
      );
  }

  editBook(book: any): void {
    Swal.fire({
      title: 'Edit Book',
      text: `Edit book "${book.book_name}"`,
      icon: 'info',
    });
  }

  deactivateBook(bookId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will deactivate the book.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#001b5e',
      cancelButtonColor: '#6b7280',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(`/api/books/deactivate/${bookId}`, {}).subscribe(
          () => {
            this.fetchBooks();
            Swal.fire('Deactivated!', 'The book has been deactivated.', 'success');
          },
          (error) => {
            console.error('Error deactivating book:', error);
            Swal.fire('Error!', 'Unable to deactivate book.', 'error');
          }
        );
      }
    });
  }

  get records(): any[] {
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
