import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBookService {

  private apiUrl = environment.apiUrl + '/search-book';

  constructor(private http: HttpClient) { }

  searchBooks(searchTerm: string, categories: number[] = []): Observable<any[]> {
    const params: any = { searchTerm };
    if (categories.length > 0) {
      params.categories = categories.join(',');
    }
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }

  getBooksByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/searchCategory/${categoryId}`);
  }


  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
}
