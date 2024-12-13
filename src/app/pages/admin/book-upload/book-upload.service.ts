import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookUploadService {
  private apiUrl: string = environment.apiUrl + '/Update-book-details';

  constructor(private http: HttpClient) {}

     // add a book
  addBook(book: {
    name: string;
    author: string;
    price: number;
    description: string;
    stock: number;
    category_id: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, book);
  }

   // Update a book
   updateBook(
    bookId: string,
    book: {
      name: string;
      author: string;
      price: number;
      description: string;
      stock: number;
      category_id: number;
    }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${bookId}`, book);
  }

  // Delete a book
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-book/${bookId}`);
  }

  // Get a single book by ID
  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookId}`);
  }

  // Get all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  // Get the stock of a specific book
  getBookStock(bookId: string): Observable<{ stock: number }> {
    return this.http.get<{ stock: number }>(`${this.apiUrl}/books/${bookId}/stock`);
  }

  // Decrement book stock
  decrementBookStock(bookId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/decrement-stock`, {
      bookId,
      quantity,
    });
  }

  // Increment book stock
  incrementBookStock(bookId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/increment-stock`, {
      bookId,
      quantity,
    });
  }

  // Get all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  // Get a single category by ID
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${categoryId}`);
  }

  // Get books by category
  getBooksByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}/books`);
  }
}
