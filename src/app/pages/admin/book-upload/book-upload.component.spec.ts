import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookUploadComponent } from './book-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookUploadComponent', () => {
  let component: BookUploadComponent;
  let fixture: ComponentFixture<BookUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookUploadComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BookUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    expect(component.bookForm.valid).toBeFalse();
  });

  it('should validate required fields', () => {
    const bookNameControl = component.bookForm.get('book_name');
    bookNameControl?.setValue('');
    expect(bookNameControl?.valid).toBeFalse();
    bookNameControl?.setValue('Book Title');
    expect(bookNameControl?.valid).toBeTrue();
  });
});
