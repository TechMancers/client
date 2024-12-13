

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { UserService } from './service/user.service';

// @Component({
//   selector: 'app-new-password',
//   templateUrl: './new-password.component.html',
//   styleUrls: ['./new-password.component.css']
// })
// export class NewPasswordComponent implements OnInit {
//   newPasswordForm!: FormGroup;
//   Message: string | null =null;
//   errorMessage: string | null =null;
//   constructor(
//     private route: ActivatedRoute,
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       const email = params['email'];
//       if (email) {
//         localStorage.setItem('email', email);
//       }
//     });

//     this.newPasswordForm = this.formBuilder.group({
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         this.passwordStrengthValidator()
//       ]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validator: this.passwordsMatchValidator
//     });
//   }

//   passwordStrengthValidator() {
//     return (control: AbstractControl) => {
//       const value = control.value;
//       if (!value) {
//         return null;
//       }
//       const hasUpperCase = /[A-Z]/.test(value);
//       const hasLowerCase = /[a-z]/.test(value);
//       const hasDigit = /\d/.test(value);
//       const hasSpecial = /[!@#$%^&*]/.test(value);
//       const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
//       if (!valid) {
//         return { 
//           uppercase: !hasUpperCase,
//           lowercase: !hasLowerCase,
//           digit: !hasDigit,
//           special: !hasSpecial
//         };
//       }
//       return null;
//     };
//   }

//   passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     if (!password || !confirmPassword) {
//       return null;
//     }
//     return password.value === confirmPassword.value ? null : { 'passwordsMismatch': true };
//   }
//   showErrorMessage() {
//     setTimeout(() => {
//       this.errorMessage = null;
//     }, 6000); // 6000 milliseconds = 6 seconds
//   }
//   submitForm(): void {
//     if (this.newPasswordForm && this.newPasswordForm.valid) {
//       const email = localStorage.getItem('email');
//       if (email) {
//         const { password, confirmPassword } = this.newPasswordForm.value;
//         this.userService.resetPassword(email, password, confirmPassword).subscribe(
//           response => {
//             console.log('Password reset successfully');
//             this.Message = 'Password reset successfully';
//             localStorage.removeItem('email');
//             this.router.navigate(['/login'],{ state: { Message: 'Password reset successfully' } });
//           },
//           (error: any) => {
//               this.errorMessage = 'Error updating password';
//               this.showErrorMessage(); // Call to disable error message
//           }
//         );
//       } else 
//       {
//         this.errorMessage = 'Email not found in local storage';
//         this.showErrorMessage(); // Call to disable error message
//       }
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setEmailFromQueryParams();
    this.initializeForm();
  }

  private setEmailFromQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        localStorage.setItem('email', email);
      }
    });
  }

  private initializeForm(): void {
    this.newPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  private passwordStrengthValidator() {
    return (control: AbstractControl) => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*]/.test(value);

      return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar
        ? null
        : {
            uppercase: !hasUpperCase,
            lowercase: !hasLowerCase,
            digit: !hasDigit,
            special: !hasSpecialChar
          };
    };
  }

  private passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.newPasswordForm.get(fieldName);
    return control?.touched && control?.invalid || false;
  }

  isFieldError(fieldName: string, errorType: string): boolean {
    const control = this.newPasswordForm.get(fieldName);
    return control?.errors?.[errorType] || false;
  }

  private clearErrorMessageAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000);
  }

  onSubmit(): void {
    if (this.newPasswordForm.invalid) return;

    const email = localStorage.getItem('email');
    if (!email) {
      this.errorMessage = 'Email not found in local storage';
      this.clearErrorMessageAfterTimeout();
      return;
    }

    const { password, confirmPassword } = this.newPasswordForm.value;
    this.userService.resetPassword(email, password, confirmPassword).subscribe(
      () => {
        this.successMessage = 'Password reset successfully';
        localStorage.removeItem('email');
        this.router.navigate(['/login'], { state: { successMessage: 'Password reset successfully' } });
      },
      () => {
        this.errorMessage = 'Error updating password';
        this.clearErrorMessageAfterTimeout();
      }
    );
  }
}
