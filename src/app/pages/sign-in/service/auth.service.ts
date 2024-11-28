// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {}

 login(email: string, password: string):Observable<any>{
  return this.http.post(`${this.apiUrl}/login`,{ email, password});
 }





}



