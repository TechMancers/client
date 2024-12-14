// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map,BehaviorSubject} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: String = environment.apiUrl +'/user'


  // BehaviorSubject to track if the user is authenticated
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isUserAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

 login(email: string, password: string):Observable<any>{
  return this.http.post(`${this.apiUrl}/login`,{ email, password}).pipe(
      map((response: any) => {
        this.storeUserData(response); // Store the user data
        this.isAuthenticatedSubject.next(true); // Set authenticated state to true
        return response;
      })
    );
 }
// Check if user is authenticated (e.g., based on the existence of a token)
private isUserAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken');
}

// Store user data in localStorage
private storeUserData(response: any): void {
  const decodedToken: any = jwtDecode(response.accessToken);
  localStorage.setItem('role', decodedToken.role);
  localStorage.setItem('user_id', response.data.user_id);
  localStorage.setItem('email', response.data.email);
  localStorage.setItem('accessToken', response.accessToken);
}

// Logout function to clear session
logout(): void {
  localStorage.clear();
  this.isAuthenticatedSubject.next(false); // Set authenticated state to false
}




}




