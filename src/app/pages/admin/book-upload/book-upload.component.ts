import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookUploadService } from './book-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css'],
})
export class BookUploadComponent implements OnInit {
  bookForm: FormGroup;
  isEdit: boolean = false;
  bookId: string | null = null;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookUploadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required, Validators.minLength(3)]],
      author_name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      book_image: [null],
    });
  }

  ngOnInit(): void {
    // Load categories
    this.loadCategories();

    // Check if editing an existing book
    this.route.params.subscribe((params) => {
      this.bookId = params['id'] || null;
      if (this.bookId) {
        this.isEdit = true;
        this.loadBookDetails();
      }
    });
  }

  // Fetch book details for editing
  loadBookDetails(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(
        (response) => {
          this.bookForm.patchValue(response);
        },
        (error) => {
          console.error('Error fetching book details:', error);
          Swal.fire('Error', 'Failed to load book details.', 'error');
        }
      );
    }
  }

  // Load all categories
  loadCategories(): void {
    this.bookService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        Swal.fire('Error', 'Failed to load categories.', 'error');
      }
    );
  }

  // Submit form for add or edit
  submitForm(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.bookForm.value).forEach((key) => {
      const value = this.bookForm.get(key)?.value;
      if (key === 'book_image' && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    if (this.isEdit && this.bookId) {
      this.bookService.updateBook(this.bookId, formData).subscribe(
        () => {
          Swal.fire('Success', 'Book updated successfully!', 'success');
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error updating book:', error);
          Swal.fire('Error', 'Failed to update book.', 'error');
        }
      );
    } else {
      this.bookService.addBook(formData).subscribe(
        () => {
          Swal.fire('Success', 'Book added successfully!', 'success');
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error adding book:', error);
          Swal.fire('Error', 'Failed to add book.', 'error');
        }
      );
    }
  }

  // Handle file input change
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // File size validation (2MB limit)
        this.bookForm.get('book_image')?.setErrors({ invalidSize: true });
      } else {
        this.bookForm.get('book_image')?.setValue(file);
      }
    }
  }

  // Cancel form and navigate back
  cancel(): void {
    this.router.navigate(['/books']);
  }
}
