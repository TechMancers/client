import { TestBed } from '@angular/core/testing';

import { UploadBookDetailsService } from './upload-book-details.service';

describe('UploadBookDetailsService', () => {
  let service: UploadBookDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadBookDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
