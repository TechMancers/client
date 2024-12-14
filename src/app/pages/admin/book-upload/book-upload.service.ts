import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookUploadService {
  private baseUrl: string = environment.apiUrl + '/Update-book-details';

  constructor(private http: HttpClient) {}

  // Add a book
  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, bookData);
  }

  // Update a book
  updateBook(bookId: string, bookData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-books/${bookId}`, bookData);
  }

  // Delete a book
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-book/${bookId}`);
  }

  // Get a single book by ID
  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/${bookId}`);
  }

  // Get all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books`);
  }

  // Get the stock of a specific book
  getBookStock(bookId: string): Observable<{ stock: number }> {
    return this.http.get<{ stock: number }>(`${this.baseUrl}/books/${bookId}/stock`);
  }

  // Decrement book stock
  decrementBookStock(bookId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/decrement-stock`, { bookId, quantity });
  }

  // Increment book stock
  incrementBookStock(bookId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/increment-stock`, { bookId, quantity });
  }

  // Get all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  // Get a single category by ID
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}`);
  }

  // Get books by category
  getBooksByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books/category/${categoryId}`);
  }

  // Upload a file (e.g., book image)
  uploadFile(file: File, uploadType: string, folder: string, subfolder: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      uploadType,
      folder,
      subfolder,
    });

    return this.http.post(`${environment.apiUrl}/upload`, formData, { headers });
  }

  // Delete a file from S3
  deleteFile(fileKey: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/delete/${fileKey}`);
  }
}
