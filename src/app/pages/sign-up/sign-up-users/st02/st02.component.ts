import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Console } from 'console';
@Component({
  selector: 'app-st02',
  templateUrl: './st02.component.html',
  styleUrls: ['./st02.component.css']
})

export class St02Component implements OnInit {
  fName: string = '';
  lName: string = '';
 
  address: string = '';
  registered_at: string = '';
  email = '';
  password = '';
  role = '';
  errorMessage: string | null =null;
  Message: string | null =null;
  signupForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router,private userService: UserService) { }

  ngOnInit(): void {

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    this.signupForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      registered_at: [currentDate, Validators.required] // Set current date as default value
    });
    
    const data = sessionStorage.getItem('artista-form-data');

    if (data) {
      const user = JSON.parse(data);
      this.email = user.email;
      this.password = user.password;
    }

    if (!data) this.router.navigate(['/st01']);
    
  }
  // createAccount() {
    
  //    // Send HTTP request to backend to create user account
  //    let userData = this.signupForm.value;
  //    userData = {...userData, email: this.email, password: this.password};
  //   //  console.log('Secondform submit',userData)
  //    this.userService.signup(userData).subscribe(
  //      (response) => {
  //        console.log('User created successfully:', response);
  //        const navigationExtras = {
  //         state: {
  //           Message: 'User created successfully. Verification mail sent.'
  //         }
  //       };
  //        // Redirect to next step after successful signup
  //        this.router.navigate(['/login'],navigationExtras); 
  //      },
  //      (error:any) => {
  //        if (error.status === 400) {
  //       this.errorMessage = 'Email Already Exists.';
  //     } 
  //        else {
  //       console.error('Registered failed', error);
  //       this.errorMessage = 'An error occurred during signup';
  //     }

  //      }
  //    );
  // }
  showErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // 6000 milliseconds = 6seconds
  }

  createAccount() {
    let userData = this.signupForm.value;
    userData = { ...userData, email: this.email, password: this.password };

    if (userData.role === 'admin') {
      // Navigate to step 03 for artists
      this.router.navigate(['/st03'], { state: { userData } });
      
    } else {
      // Send HTTP request to backend to create user account
      this.userService.signup(userData).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          const navigationExtras = {
            state: {
              Message: 'User created successfully. Verification mail sent.'
            }
          };
          // Redirect to login after successful signup
          this.router.navigate(['/login'], navigationExtras);
        },
        (error: any) => {
          if (error.status === 400) {
            this.errorMessage = 'Email Already Exists.';
          } else {
            console.error('Registered failed', error);
            this.errorMessage = 'An error occurred during signup';
          }
          this.showErrorMessage(); // Call to disable error message
        }
      );
    }
  }
}
