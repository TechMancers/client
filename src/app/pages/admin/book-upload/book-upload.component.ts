import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// import { BookService } from '../../services/book.service';

// Custom Validator: Word limit for description
function wordCountValidator(maxWords: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const wordCount = control.value.trim().split(/\s+/).length;
    return wordCount > maxWords ? { wordLimitExceeded: true } : null;
  };
}

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrl: './book-upload.component.css',
})
export class BookUploadComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string | null;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    // private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', [Validators.required, wordCountValidator(1000)]],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      category_id: ['', [Validators.required]],
      book_image: [null],
    });
  }

  ngOnInit(): void {
    if (this.bookId) {
      this.isEdit = true;
      this.fetchBookDetails();
    }
  }

  fetchBookDetails(): void {
    // Assuming `bookService` is implemented and uncommented
    /*
    this.bookService.getBookById(this.bookId!).subscribe(
      (data) => {
        this.bookForm.patchValue({
          book_name: data.book_name,
          author_name: data.author_name,
          price: data.price,
          description: data.description,
          stock: data.stock,
          category_id: data.category_id,
          book_image: null, // For file inputs, Angular doesn't prefill values
        });
      },
      (error) => {
        console.error('Error fetching book details', error);
      }
    );
    */
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Book image size should not exceed 2MB.',
      });
      this.bookForm.get('book_image')?.setErrors({ invalidSize: true });
    } else {
      this.bookForm.get('book_image')?.setValue(file); // Ensure the file is set
      this.bookForm.get('book_image')?.updateValueAndValidity(); // Trigger validation updates
    }
  }
  

  submitForm(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.entries(this.bookForm.value).forEach(([key, value]) => {
      if (key === 'book_image' && value instanceof File) {
        formData.append(key, value); // Append the file directly
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value)); // Ensure everything else is a string
      }
    });
    
    

    // Assuming `bookService` is implemented and uncommented
    /*
    const request = this.isEdit
      ? this.bookService.updateBook(this.bookId!, formData)
      : this.bookService.addBook(formData);

    request.subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Book ${this.isEdit ? 'updated' : 'added'} successfully!`,
        }).then(() => this.router.navigate(['/admin/booklist']));
      },
      (error) => {
        console.error('Error submitting form', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again.',
        });
      }
    );
    */
  }

  cancel(): void {
    this.router.navigate(['/admin/booklist']);
  }
}
