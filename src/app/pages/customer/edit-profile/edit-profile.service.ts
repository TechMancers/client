import { EditProfileComponent } from './edit-profile.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private apiUrl: string = environment.apiUrl + '/edit-profile';
  private apiurl: String = environment.apiUrl +'/user'
  constructor(private http:HttpClient) { }

  EditProfile(userId: string, data: any): Observable<any> {
    console.log('data in service edit', data);
    return this.http.put<any>(`${this.apiUrl}/${userId}`, data);
  }
  changePassword( email: string,oldPassword: string,newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiurl}/changePassword`, {email,oldPassword,newPassword, confirmPassword });
  }
}

