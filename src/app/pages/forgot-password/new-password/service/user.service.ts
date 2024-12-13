import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {}

  resetPassword( email: string,password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, {email, password, confirmPassword });
  }
}
