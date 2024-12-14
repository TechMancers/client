import { TestBed } from '@angular/core/testing';

import { BookPreviewService } from './book-preview.service';

describe('BookPreviewService', () => {
  let service: BookPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
