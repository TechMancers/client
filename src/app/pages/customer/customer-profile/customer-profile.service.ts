import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  private apiUrl = environment.apiUrl + '/profile-page';
  private apiUrl1 = environment.apiUrl + '/wishlist';

  constructor(private http: HttpClient) { }

  getAllCustomers(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  deactivateCustomer(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/deactivate/${userId}`, {});
  }

  getCustomerWishList(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}/${userId}`);
  }

  removeItemFromWishList(userId: string, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${userId}/${itemId}`);
  }
}
