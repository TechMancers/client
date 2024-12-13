import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  private apiUrl: string = environment.apiUrl + '/purchase';

  constructor(private http:  HttpClient) {  }

  // Function to get user details
  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Function to create purchase
  createPurchase(userId: string, data: any): Observable<any> {
    console.log('data in service', data);
    return this.http.post(`${this.apiUrl}/${userId}`, data);
  }

}
