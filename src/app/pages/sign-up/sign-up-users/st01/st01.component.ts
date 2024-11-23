
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-st01',
  templateUrl: './st01.component.html',
  styleUrls: ['./st01.component.css']
})
export class St01Component {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      sessionStorage.setItem('artista-form-data', JSON.stringify(this.signUpForm.value));
      console.log('Form submitted with data:', this.signUpForm.value);
      this.router.navigate(['/st02']);
    }
  }
}
