import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookDetailsComponent } from './upload-book-details.component';

describe('UploadBookDetailsComponent', () => {
  let component: UploadBookDetailsComponent;
  let fixture: ComponentFixture<UploadBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadBookDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
