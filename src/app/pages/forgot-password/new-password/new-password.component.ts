

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
  Message: string | null =null;
  errorMessage: string | null =null;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        localStorage.setItem('email', email);
      }
    });

    this.newPasswordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordsMatchValidator
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

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { 'passwordsMismatch': true };
  }
  showErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // 6000 milliseconds = 6 seconds
  }
  submitForm(): void {
    if (this.newPasswordForm && this.newPasswordForm.valid) {
      const email = localStorage.getItem('email');
      if (email) {
        const { password, confirmPassword } = this.newPasswordForm.value;
        this.userService.resetPassword(email, password, confirmPassword).subscribe(
          response => {
            console.log('Password reset successfully');
            this.Message = 'Password reset successfully';
            localStorage.removeItem('email');
            this.router.navigate(['/login'],{ state: { Message: 'Password reset successfully' } });
          },
          (error: any) => {
              this.errorMessage = 'Error updating password';
              this.showErrorMessage(); // Call to disable error message
          }
        );
      } else 
      {
        this.errorMessage = 'Email not found in local storage';
        this.showErrorMessage(); // Call to disable error message
      }
    }
  }
}
