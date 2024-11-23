// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl: string = environment.apiUrl + '/preferences';
  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {}

 login(email: string, password: string,  recaptchaToken: string):Observable<any>{
  return this.http.post(`${this.apiUrl}/login`,{ email, password ,recaptchaToken});
 }


checkPreferences(uid: string): Observable<any> {
  console.log('uid', uid);
  return this.http.get(`${this.apiurl}/checkPreferences/${uid}`);
}


}




