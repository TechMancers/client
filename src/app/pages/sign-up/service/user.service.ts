import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {
    
  }

 signup(user: any):Observable<any>{
  console.log('user in service',user);
  return this.http.post(`${this.apiUrl}/signup`,{ user });
 }


}
