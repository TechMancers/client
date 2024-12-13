import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl: string = environment.apiUrl + '/manage-users';

  constructor(private http: HttpClient) { }

  fetchUsers(queryParams: any): Observable<any> {
    const params = new URLSearchParams(queryParams).toString();
    return this.http.get<any>(`${this.apiUrl}/users?${params}`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  getPurchaseHistory(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}/purchase-history`);
  }

  updateUserState(userId: string, payload: { isActive?: boolean, isBanned?: boolean }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}/state`, payload);
  }

  suspendUser(userId: string, payload: { 
    isSuspended: boolean, 
    suspendReason?: string, 
    suspendBegin?: string, 
    suspendEnd?: string 
  }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}/suspend`, payload);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
