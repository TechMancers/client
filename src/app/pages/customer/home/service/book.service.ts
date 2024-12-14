// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl + '/book-card';

 constructor(private http: HttpClient) { }

 getBestSellingBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);

}

getbooks(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/books`);

}

}