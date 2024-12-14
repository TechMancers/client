import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) { }

  addItem(userId: string, bookId: number): Observable<any> {
    console.log('userId', userId, 'bookId', bookId);
    return this.http.post(`${this.apiUrl}/add`, { userId, bookId });
  }
}
