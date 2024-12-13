
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from './service/user.service';


// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css']
// })
// export class ResetPasswordComponent implements OnInit {
//   resetForm!: FormGroup;
//   Message: string | null =null;
//   errorMessage: string | null = null;
//   constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    
//   }

//   ngOnInit(): void {
//     this.resetForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
    
//   }
//   showSuccessMessage() {
//     setTimeout(() => {
//       this.Message = null;
//     }, 6000); // 6000 milliseconds = 6 seconds
//   }
//   showErrorMessage() {
//     setTimeout(() => {
//       this.errorMessage = null;
//     }, 6000); // 6000 milliseconds = 6 seconds
//   }
//   submitForm(): void {
//     if (this.resetForm && this.resetForm.valid) {
//       const email = this.resetForm.value.email;
//       this.userService.forgotPassword(email).subscribe(
//         response => {
//           console.log(response);
//           this.Message = 'Password reset link sent to your email address.';
//           this.showSuccessMessage();
//         },
//         (error: any) =>{
    
//             this.errorMessage = 'User not found. Please register or try a different email.';
//           this.showErrorMessage(); // Call to disable error message
//         }
//       );
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private showSuccessMessage(): void {
    setTimeout(() => {
      this.message = null;
    }, 6000); // Hide success message after 6 seconds
  }

  private showErrorMessage(): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // Hide error message after 6 seconds
  }

  submitForm(): void {
    if (this.resetForm.valid) {
      const { email } = this.resetForm.value;

      this.userService.forgotPassword(email).subscribe(
        response => {
          console.log(response);
          this.message = 'Password reset link sent to your email address.';
          this.showSuccessMessage();
        },
        error => {
          console.error(error);
          this.errorMessage = 'User not found. Please register or try a different email.';
          this.showErrorMessage();
        }
      );
    }
  }
}
