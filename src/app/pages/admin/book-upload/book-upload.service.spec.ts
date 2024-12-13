import { TestBed } from '@angular/core/testing';

import { BookUploadService } from './book-upload.service';

describe('BookUploadService', () => {
  let service: BookUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
