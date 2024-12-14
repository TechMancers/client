

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  Message: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { Message: string };
    if (state) {
      this.successMessage = state.Message;
      this.showSuccessMessage();
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // Password strength validation logic
  passwordStrengthValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);
      const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
      
      return valid ? null : {
        uppercase: !hasUpperCase,
        lowercase: !hasLowerCase,
        digit: !hasDigit,
        special: !hasSpecial
      };
    };
  }

  showSuccessMessage() {
    setTimeout(() => {
      this.successMessage = null;
    }, 6000); // 6 seconds timeout
  }

  showErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // 6 seconds timeout
  }

  // Handle sign in logic
  signIn() {
    if (!this.loginForm.valid) {
      this.showErrorMessage(); // Display error if form is invalid
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.login(email, password).subscribe(
        (response: any) => {
          const decodedToken: any = jwtDecode(response.accessToken);
          this.storeUserData(response, decodedToken);
          this.navigateBasedOnRole(decodedToken.role);
        },
        (error: any) => {
          this.handleLoginError(error);
        }
      );
    } else {
      this.showErrorMessage(); // Display error if email or password is missing
    }
  }

  // Store user data in localStorage
  storeUserData(response: any, decodedToken: any) {
    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem('user_id', response.data.user_id);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('accessToken', response.accessToken);
  }

  // Navigate based on the role of the user
  navigateBasedOnRole(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/st01']); // Admin route
    } else if (role === 'customer') {
      this.router.navigate(['/']); // Customer route
    } else {
      console.error('Unknown role:', role);
    }
  }

  // Handle login error and display error message
  handleLoginError(error: any) {
    if (error.status === 400 && error.error.message === 'Invalid Credentials') {
      this.errorMessage = 'Email or Password Incorrect. Please try again later.';
    } else {
      this.errorMessage = 'An error occurred. Please try again later.';
    }
    this.showErrorMessage(); // Call to disable error message
  }
}
