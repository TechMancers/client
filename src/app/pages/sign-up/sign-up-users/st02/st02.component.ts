// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from '../../service/user.service';
// @Component({
//   selector: 'app-st02',
//   templateUrl: './st02.component.html',
//   styleUrls: ['./st02.component.css']
// })

// export class St02Component implements OnInit {
//   fName: string = '';
//   lName: string = '';
 
//   address: string = '';
//   registered_at: string = '';
//   email = '';
//   password = '';
//   role = '';
//   errorMessage: string | null =null;
//   Message: string | null =null;
//   signupForm!: FormGroup;


//   constructor(private fb: FormBuilder, private router: Router,private userService: UserService) { }

//   ngOnInit(): void {

//     const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

//     this.signupForm = this.fb.group({
//       fName: ['', Validators.required],
//       lName: ['', Validators.required],
//       address: ['', Validators.required],
//       role: ['', Validators.required],
//       registered_at: [currentDate, Validators.required] // Set current date as default value
//     });
    
//     const data = sessionStorage.getItem('artista-form-data');

//     if (data) {
//       const user = JSON.parse(data);
//       this.email = user.email;
//       this.password = user.password;
//     }

//     if (!data) this.router.navigate(['/st01']);
    
//   }
 
//   showErrorMessage() {
//     setTimeout(() => {
//       this.errorMessage = null;
//     }, 6000); // 6000 milliseconds = 6seconds
//   }

  
//   // createAccount() {
//   //   let userData = this.signupForm.value;
//   //   userData = { ...userData, email: this.email, password: this.password };
  
//   //   if (userData.role.includes('admin')) {
//   //     // If user is admin and can also log in as customer, handle appropriately
//   //     const navigationExtras = {
//   //       state: {
//   //         userData,
//   //         Message: 'Admin account created successfully.'
//   //       }
//   //     };
//   //     this.router.navigate(['/login'], navigationExtras);
//   //   } else {
//   //     // For other users (e.g., customer), send HTTP request to create user account
//   //     this.userService.signup(userData).subscribe(
//   //       (response) => {
//   //         console.log('User created successfully:', response);
//   //         const navigationExtras = {
//   //           state: {
//   //             Message: 'User created successfully. Verification mail sent.'
//   //           }
//   //         };
//   //         // Redirect to login after successful signup
//   //         this.router.navigate(['/login'], navigationExtras);
//   //       },
//   //       (error: any) => {
//   //         if (error.status === 400) {
//   //           this.errorMessage = 'Email Already Exists.';
//   //         } else {
//   //           console.error('Registered failed', error);
//   //           this.errorMessage = 'An error occurred during signup';
//   //         }
//   //         this.showErrorMessage(); // Call to disable error message
//   //       }
//   //     );
//   //   }
//   // }
  
//   createAccount() {
//     let userData = this.signupForm.value;
//     userData = { ...userData, email: this.email, password: this.password };
  
//     if (userData.role.includes('admin')) {
//       // Handle admin registration
//       this.userService.signup(userData).subscribe(
//         (response) => {
//           console.log('Admin created successfully:', response);
//           const navigationExtras = {
//             state: {
//               Message: 'Admin account created successfully.',
//             },
//           };
//           this.router.navigate(['/login'], navigationExtras); // Redirect to login after admin signup
//         },
//         (error: any) => {
//           if (error.status === 400) {
//             this.errorMessage = 'Admin Email Already Exists.';
//           } else {
//             console.error('Admin registration failed', error);
//             this.errorMessage = 'An error occurred during admin signup';
//           }
//           this.showErrorMessage(); // Call to show error message
//         }
//       );
//     } else {
//       // Handle customer registration
//       this.userService.signup(userData).subscribe(
//         (response) => {
//           console.log('Customer created successfully:', response);
//           const navigationExtras = {
//             state: {
//               Message: 'User created successfully. Verification mail sent.',
//             },
//           };
//           this.router.navigate(['/login'], navigationExtras); // Redirect to login after customer signup
//         },
//         (error: any) => {
//           if (error.status === 400) {
//             this.errorMessage = 'Email Already Exists.';
//           } else {
//             console.error('Customer registration failed', error);
//             this.errorMessage = 'An error occurred during signup';
//           }
//           this.showErrorMessage(); // Call to show error message
//         }
//       );
//     }
//   }
  
// }



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

