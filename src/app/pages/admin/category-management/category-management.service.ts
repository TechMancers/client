import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  private apiUrl: string = environment.apiUrl + '/book-categories';
  private categoryList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  loadCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-categories`);
  }

  getCategorylist(): Observable<any[]> {
    this.loadCategoryList().subscribe((data:any[]) => {
      this.categoryList.next(data);
    });
    if (this.categoryList.value.length === 0) {
      this.loadCategoryList().subscribe((data:any[]) => {
        this.categoryList.next(data);
      });
    }
    return this.categoryList.asObservable();
  }

  createCategory(category: any): Observable<any> {
    console.log(category);
    return this.http.post<any>(`${this.apiUrl}/create-category`, category);
  }

  updateCategory(categoryId: String, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-category/${categoryId}`, category);
  }

  deleteCategory(categoryId: String): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-category/${categoryId}`);
  }
}
