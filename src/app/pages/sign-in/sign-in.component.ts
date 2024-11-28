
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
    private AuthService: AuthService, 
    private router: Router,

  ) 
  {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { Message: string };
    if (state) {
      this.successMessage = state.Message;
      this.showSuccessMessage();
     
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]]
    });

  }
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
      if (!valid) {
        return { 
          uppercase: !hasUpperCase,
          lowercase: !hasLowerCase,
          digit: !hasDigit,
          special: !hasSpecial
        };
      }
      return null;
    };
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    
  }



  showSuccessMessage() {
    setTimeout(() => {
      this.successMessage = null;
    }, 6000); // 6000 milliseconds = 6 seconds
  }

  showErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // 6000 milliseconds = 6seconds
  }
  
  // signIn() {
  //   if (this.loginForm?.valid) {
  //     const email = this.loginForm.get('email')?.value;
  //     const password = this.loginForm.get('password')?.value;

  //     if (email && password ) {
  //       this.AuthService.login(email, password).subscribe(
  //         (response: any) => {
  //           // Decode the JWT token
  //           const decodedToken: any = jwtDecode(response.accessToken);
  //           // Store the uid and role in local storage
  //           localStorage.setItem('uid', decodedToken.uid);
  //           localStorage.setItem('role', decodedToken.role);
  //           localStorage.setItem('user_id', response.data.user_id);
  //           localStorage.setItem('email', response.data.email);
  //           localStorage.setItem('firebase_uid', response.data.firebase_uid);
  //           //console.log('decodedToken', decodedToken);
  //           localStorage.setItem('accessToken', response.accessToken);

  //           // Navigate based on role
  //           if (decodedToken.role === 'admin') {
  //             this.router.navigate(['/']);
  //           } else {
  //             this.AuthService.checkPreferences(response.data.user_id).subscribe(
  //               (prefResponse: any) => {
  //                // console.log('Preferences response', prefResponse);
  //                 if (prefResponse.hasPreferences) {
  //                   this.router.navigate(['/']);
  //                 } else {
  //                   this.router.navigate(['/firstforyou']);
  //                 }
  //               },
  //               (prefError: any) => {
  //                 console.error('Error checking preferences', prefError);
  //                 // this.router.navigate(['/firstforyou']); // Default to firstforyou on error
  //               }
  //             );
  //           }
  //         },
  //         (error: any) => {
           
  //          if (error.status === 400 && error.error.message === 'Invalid Credentials') {
  //             this.errorMessage = 'Email or Password Incorrect. Please try again later.';
  //           }
  //          else {
  //             console.error('Login failed', error);
  //             this.errorMessage = 'Email or Password Incorrect. Please try again later.';
  //           }
  //           this.showErrorMessage(); // Call to disable error message
  //         }
  //       );
  //     } else {
       
  //       this.showErrorMessage(); // Call to disable error message
  //     }
  //   }
  // }
  signIn() {
    if (this.loginForm?.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      if (email && password) {
        this.AuthService.login(email, password).subscribe(
          (response: any) => {
            // Decode the JWT token
            const decodedToken: any = jwtDecode(response.accessToken);
            // Store necessary details in local storage
            
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('email', response.data.email);

            localStorage.setItem('accessToken', response.accessToken);
  
            // Navigate based on role
            if (decodedToken.role === 'admin') {
              this.router.navigate(['/st01']); // Admin route
            } else if (decodedToken.role === 'customer') {
              this.router.navigate(['/']); // Customer route
            } else {
              console.error('Unknown role:', decodedToken.role);
            }
          },
          (error: any) => {
            // Handle errors
            if (error.status === 400 && error.error.message === 'Invalid Credentials') {
              this.errorMessage = 'Email or Password Incorrect. Please try again later.';
            } else {
              console.error('Login failed', error);
              this.errorMessage = 'Email or Password Incorrect. Please try again later.';
            }
            this.showErrorMessage(); // Call to disable error message
          }
        );
      } else {
        this.showErrorMessage(); // Call to disable error message
      }
    }
  }
  
  
}
