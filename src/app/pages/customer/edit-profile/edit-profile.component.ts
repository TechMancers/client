import { Component, OnInit } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../../../shared/services/customerData.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {

initialCustomerData: any = {}; // To store the initial customer data
emailInput: any;
confirmPasswordInput: any;

  constructor(
    private editProfileService: EditProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private customerDataService: CustomerDataService,
  ) {}

  editingCustomer: string = '';
  customer: any = {};

  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingCustomer = params['userId'];

      this.customerDataService.currentCustomerData$.subscribe((data) => {
        this.customer = { ...data };
        this.initialCustomerData = { ...data }; // Save initial customer data
        console.log('customer', this.customer);
      });
    });
  }

  editDetails(editCustomerProfileForm: any) {
    if (editCustomerProfileForm.valid) {
      if (this.customer.newPassword && this.confirmPassword !== this.customer.newPassword) {
        alert('Passwords do not match');
        return;
      }

      const customerDetails = {
        FName: this.customer.fName,
        LName: this.customer.LName,
        address: this.customer.address,
        phone: this.customer.phone,
      };

      this.editProfileService.EditProfile(this.editingCustomer, customerDetails).subscribe(
          () => {
            alert('Profile saved successfully!');
          },
          (error) => {
            console.log('error editing customer', error);
            alert('There was an error saving the profile. Please try again.');
          }
        );
    }
  }

  discardChanges() {
    this.customer = { ...this.initialCustomerData };
    alert('Changes discarded and defaults set.');
    this.router.navigate(['/customer-profile-gallery']);
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.editProfileService.changePassword(this.email, this.oldPassword, this.newPassword, this.confirmPassword).subscribe(
      (response) => {
        console.log('Password changed successfully', response);
        alert('Password changed successfully!');
      },
      (error) => {
        console.error('Error changing password', error);
        alert('Error changing password. Please try again.');
      }
    );
  }
}

