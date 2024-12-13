import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  private apiUrl = environment.apiUrl + '/purchase-history';

  constructor(private http: HttpClient) { }

  getPurchaseHistory(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  deletePurchase(purchaseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${purchaseId}`);
  }
}
