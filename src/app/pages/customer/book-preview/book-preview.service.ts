import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookPreviewService {

  private apiUrl: string = environment.apiUrl + '/book-preview';

  constructor(private http: HttpClient) { }

  getBookDetails(book_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${book_id}`);
  }

  getRelatedBooks(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bookId}/related`);
  }

  addToWishlist(bookId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/wishlist`, { user_id: userId });
  }

  removeFromWishlist(bookId: string, userId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${bookId}/wishlist`, { body: { user_id: userId } });
  }

  getComments(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bookId}/comments`);
  }

  postComment(bookId: string, userId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/comments`, { user_id: userId, content });
  }

  replyToComment(bookId: string, parentCommentId: number, userId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/comments/${parentCommentId}/replies`, { user_id: userId, content });
  }

  editComment(bookId: string, commentId: number, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookId}/comments/${commentId}`, { content });
  }

  deleteComment(bookId: string, commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}/comments/${commentId}`);
  }
}
