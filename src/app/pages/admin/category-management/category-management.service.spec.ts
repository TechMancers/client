import { TestBed } from '@angular/core/testing';

import { CategoryManagementService } from './category-management.service';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
