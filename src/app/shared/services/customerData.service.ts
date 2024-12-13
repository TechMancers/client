import{ Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerDataService {
  private customerData = new BehaviorSubject<any>(null);
  currentCustomerData$ = this.customerData.asObservable();

  constructor() { }

  setCustomerData(data: any) {
    this.customerData.next(data);
  }
}

