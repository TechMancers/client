

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-st02',
  templateUrl: './st02.component.html',
  styleUrls: ['./st02.component.css']
})
export class St02Component implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string | null = null;
  Message: string | null = null;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();

    // Retrieve previous step data from session storage
    const data = sessionStorage.getItem('artista-form-data');
    if (data) {
      const user = JSON.parse(data);
      this.email = user.email;
      this.password = user.password;
    } else {
      this.router.navigate(['/st01']);
    }
  }

  // Initialize the form with default values and validation
  initializeForm(): void {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    this.signupForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      registered_at: [currentDate, Validators.required] // Default value for signup date
    });
  }

  // Show error message for a limited time
  showErrorMessage(): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // Clear after 6 seconds
  }

  // Handle account creation based on user role
  createAccount(): void {
    if (this.signupForm.invalid) return;

    let userData = this.signupForm.value;
    userData = { ...userData, email: this.email, password: this.password };

    if (userData.role === 'admin') {
      this.createAdminAccount(userData);
    } else {
      this.createCustomerAccount(userData);
    }
  }

  // Create admin account
  createAdminAccount(userData: any): void {
    this.userService.signup(userData).subscribe(
      (response) => {
        console.log('Admin created successfully:', response);
        const navigationExtras = { state: { Message: 'Admin account created successfully.' } };
        this.router.navigate(['/login'], navigationExtras);
      },
      (error) => {
        this.handleError(error, 'Admin Email Already Exists.');
      }
    );
  }

  // Create customer account
  createCustomerAccount(userData: any): void {
    this.userService.signup(userData).subscribe(
      (response) => {
        console.log('Customer created successfully:', response);
        const navigationExtras = { state: { Message: 'User created successfully. Verification mail sent.' } };
        this.router.navigate(['/login'], navigationExtras);
      },
      (error) => {
        this.handleError(error, 'Email Already Exists.');
      }
    );
  }

  // Handle errors in account creation
  handleError(error: any, defaultErrorMessage: string): void {
    if (error.status === 400) {
      this.errorMessage = defaultErrorMessage;
    } else {
      console.error('Registration failed', error);
      this.errorMessage = 'An error occurred during signup';
    }
    this.showErrorMessage();
  }
}

