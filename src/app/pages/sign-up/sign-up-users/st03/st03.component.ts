

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-st03',
  templateUrl: './st03.component.html',
  styleUrls: ['./st03.component.css']
})
export class St03Component implements OnInit {
  artistForm!: FormGroup;
  userData: any;
 
  errorMessage: string | null =null;
  Message: string | null =null;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.userData = navigation?.extras.state?.['userData'];
    console.log('user data', this.userData);
    this.artistForm = this.fb.group({
      profession: ['', Validators.required],
      description: ['', Validators.required],
      platforms: this.fb.array([])  // Initialize the form array
    });
  }

  ngOnInit(): void {
    if (!this.userData) {
      this.router.navigate(['/st02']);
      return;
    }
    
  }

  get platformsFormArray(): FormArray {
    return this.artistForm.get('platforms') as FormArray;
  }

 

  showErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 6000); // 6000 milliseconds = 6 seconds
  }
  submitArtistDetails() {
   
    const artistData = this.artistForm.value;
    const platforms = artistData.platforms.filter((platform: any) => platform.url !== '');
    const completeData = { ...this.userData, ...artistData };

    this.userService.signup(completeData).subscribe(
      (response) => {
        console.log('Artist created successfully:', response);
        const navigationExtras = {
          state: {
            Message: 'Artist created successfully. Verification mail sent.'
          }
        };
        this.router.navigate(['/login'], navigationExtras);
      },
      // (error: any) => {
      //   console.error('Artist registration failed', error);
      // }

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
