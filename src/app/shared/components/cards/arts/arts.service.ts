import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/enviorenment';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private apiUrl: string = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) { }

  addItem(userId: string, bookId: number): Observable<any> {
    console.log('userId', userId, 'artworkId', bookId);
    return this.http.post(`${this.apiUrl}/add`, { userId, bookId });
  }

  removeItem(userId: string, bookId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/remove`, { body: { userId, bookId } });
  }
  

  getCartItems(userId:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  incrementQuantity(userId: string, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/increment`, { userId, bookId });
  }

  decrementQuantity(userId: string, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/decrement`, { userId, bookId });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/clear`, { body: { userId } });
  }
  likeArtwork(userId: string, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/like`, { userId,bookId });
  }
  getLikedStatus(userId: string, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/liked-status`, { userId, bookId });
  }

  getTotalLikes(bookId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-likes/${bookId}`);
  }

}  