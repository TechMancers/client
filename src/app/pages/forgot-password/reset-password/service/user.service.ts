import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  resetPassword(email: any, password: any) {
    throw new Error('Method not implemented.');
  }
  
  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {}

  forgotPassword(email:string):Observable<any>{
  return this.http.post(`${this.apiUrl}/forgotPasword`,{ email });
 }
}
