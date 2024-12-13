import { TestBed } from '@angular/core/testing';

import { CustomerDataService } from './customerData.service';

describe('CustomerDataService', () => {
  let service: CustomerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
