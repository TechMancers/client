import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = environment.apiUrl + '/categories';
  constructor(private http:  HttpClient) { }

  getcategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  
}
