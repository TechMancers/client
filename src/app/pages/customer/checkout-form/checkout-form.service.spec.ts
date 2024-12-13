import { TestBed } from '@angular/core/testing';

import { CheckoutServiceService } from './checkout-form.service';

describe('CheckoutFormService', () => {
  let service:CheckoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
