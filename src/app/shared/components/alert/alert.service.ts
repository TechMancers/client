import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new Subject<{ message: string, isSuccess: boolean, errorMessage?: string }>();
  message$ = this.messageSource.asObservable();

  constructor() { }

  showMessage(message: string, isSuccess: boolean, errorMessage?: string) {
    this.messageSource.next({ message, isSuccess, errorMessage });
  }
}
