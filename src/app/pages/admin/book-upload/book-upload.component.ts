import { ImageUploadService } from './../../../shared/services/image-upload.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookUploadService } from './book-upload.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrl: './book-upload.component.css',
})
export class BookUploadComponent implements OnInit{
  books: any[] = []; // Array to hold all books
  categories: any[] = []; // Array to hold all categories
  errorMessage: string | null = '';
  bookForm: any;
  successMessage: string | null = null;
  errorMessages: string | null = null;
  errorMessagess: string | null = null;
  newErrorMessage: string | null = null;
  selectedBook: any = null;
  isEdit: boolean = false;
  isCategoryEdit = false;
  selectedCategory: string = ''; // Currently selected category
  uploadedImageUrl: string | null = null; // To store the uploaded image URL
  selectedFile: File | null = null; // To store the selected file



  constructor(private bookService:BookUploadService, private fb:FormBuilder ,private imageUploadService:ImageUploadService){
    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', [Validators.required]],
      cover_image: ['']

    });
  }


  ngOnInit():void{
    this.getBooks();
    this.getBooksByCategory(this.categories[0]);
    this.getCategories();

  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Books:', data); // Log to inspect data
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.errorMessage = 'Failed to fetch books.';
      }
    });
  }
  viewBookDetails(bookId: string) {
    this.bookService.getBookById(bookId).subscribe({
      next: (data) => {
        this.selectedBook = data;  // Store the selected book details
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch book details.';
      }
    });
  }




  deleteBook(bookId: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.successMessage = 'Book deleted successfully!';
          this.newErrorMessage = null;
          this.getBooks(); // Refresh the book list
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.errorMessage = 'Failed to delete book. Please try again.';
          this.successMessage = null;
        }
      });
    }
  }


  addBook() {
    const newBook = this.bookForm.value; // Get new book data from the form

    this.bookService.addBook(newBook).subscribe({
      next: (response) => {
        this.successMessage = 'Book added successfully!';
        this.errorMessage = null;
        this.bookForm.reset(); // Reset the form after successful submission
        this.getBooks(); // Refresh the book list
      },
      error: (err) => {
        console.error('Error adding book:', err);
        this.errorMessage = 'Failed to add book. Please try again.';
        this.successMessage = null;
      },
    });
  }

  updateBook() {
    if (this.selectedBook && this.selectedBook.id) {
      const bookId = this.selectedBook.id; // Use the selected book's ID
      const updatedBook = this.bookForm.value; // Get updated data from the form

      this.bookService.updateBook(bookId, updatedBook).subscribe({
        next: (response) => {
          this.successMessage = 'Book updated successfully!';
          this.errorMessagess = null;
          this.isEdit = false; // Switch back to add mode
          this.selectedBook = null; // Clear selected book
          this.bookForm.reset(); // Reset the form
          this.getBooks(); // Refresh the book list
        },
        error: (err) => {
          console.error('Error updating book:', err);
          this.errorMessage = 'Failed to update book. Please try again.';
          this.successMessage = null;
        },
      });
    } else {
      this.errorMessage = 'No book selected for updating.';
    }
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) { // Check if file size exceeds 5MB
        this.bookForm.get('book_image')?.setErrors({ invalidSize: true });
      } else {
        this.bookForm.get('book_image')?.setErrors(null); // Clear errors
        // Store the file in the form group or handle as required
        this.bookForm.patchValue({ book_image: file });
      }
    }
  }
  cancel() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.bookForm.reset(); // Reset the form
      this.selectedBook = null; // Clear selected book if in edit mode
    }
  }
  submitForm() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Book added successfully!';
          this.errorMessage = null;
          this.bookForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to add book. Please try again.';
          this.successMessage = null;
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }

  // Increment book stock
incrementStock(bookId: string, quantity: number) {
  this.bookService.incrementBookStock(bookId, quantity).subscribe({
    next: (response) => {
      alert('Stock incremented successfully!');
      this.getBooks(); // Refresh the book list to update stock
    },
    error: (err) => {
      console.error('Error incrementing stock:', err);
      alert('Failed to increment stock.');
    }
  });
}

// Decrement book stock
decrementStock(bookId: string, quantity: number) {
  this.bookService.decrementBookStock(bookId, quantity).subscribe({
    next: (response) => {
      alert('Stock decremented successfully!');
      this.getBooks(); // Refresh the book list to update stock
    },
    error: (err) => {
      console.error('Error decrementing stock:', err);
      alert('Failed to decrement stock.');
    }
  });
}

getBooksByCategory(categoryId: string): void {
  this.bookService.getBooksByCategory(categoryId).subscribe({
    next: (data) => {
      this.books = data;
    },
    error: (err) => {
      console.error('Error fetching books by category:', err);
      this.errorMessage = 'Failed to fetch books for the selected category.';
    }
  });
}
onCategoryChange(event: any): void {
  const categoryId = event.target.value;
  this.getBooksByCategory(categoryId);
}


getCategories(): void {
  this.bookService.getAllCategories().subscribe(
    // next: (data) => {
    //   // Assuming the backend returns an object like { categories: [...] }
    //   this.categories = data || [];  // Safely access categories in response
    //   console.log('Categories:', this.categories);
    // },
    (data:any) => {
      this.categories = data.categories;
      console.log(this.categories);
    },
     (err) => {
      console.error('Error fetching categories:', err);
      this.errorMessage = 'Failed to fetch categories.';
    },
  );
}





uploadImage(): void {
  if (!this.selectedFile) {
    this.errorMessage = 'Please select an image to upload.';
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile); // Append the selected file
  formData.append('folder', 'books'); // Folder to upload the image
  formData.append('uploadType', 'image');

  this.imageUploadService.imageUpload(formData, 'books', 'image').subscribe({
    next: (response: any) => {
      this.uploadedImageUrl = response.url; // Assuming the backend returns the image URL
      this.bookForm.patchValue({ book_image: this.uploadedImageUrl }); // Update form with image URL
      this.successMessage = 'Image uploaded successfully!';
      this.errorMessage = null;
    },
    error: (err) => {
      console.error('Error uploading image:', err);
      this.errorMessage = 'Failed to upload image. Please try again.';
    },
  });
}





}
