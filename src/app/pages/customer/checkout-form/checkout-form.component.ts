import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { CheckoutServiceService } from './checkout-form.service';
import { CartService } from '../cart/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { group } from 'node:console';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {


  title='intlInputNew';
  reactiveForm: FormGroup;
  submitted: boolean = false;
  submissionSuccess = false;
  quantity: number = 0;
  price: number = 0;
  userData: any = {}; // Object to store user data
  cartItems: any[] = []; // Array to store cart items
  //userId: string = localStorage.getItem('user_id') || '';
  userId: string = "1";
  fiName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';

  private iti: any;
  @ViewChild('phoneNumberInput', { static: false }) phoneNumberInput: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
     private formBuilder: FormBuilder,
      private checkoutService: CheckoutServiceService, 
       private cartService: CartService,
       private reactiveFormsModule: ReactiveFormsModule, 
       private commonModule: CommonModule)
       
       {
      this.reactiveForm = this.formBuilder.group({
        firstNameInput: [null, Validators.required],
        lastNameInput: [null, Validators.required],
        emailInput: [null, [Validators.required, Validators.email]],
        locationInput: [null, Validators.required],
        phoneNumberInput: [null, [Validators.required, this.validatePhoneNumber.bind(this)]],
        
        paymentOption: [null, Validators.required],
        agreeTermsCheckbox: [false, Validators.requiredTrue],
        agreePrivacyCheckbox: [false, Validators.requiredTrue],
        agreeMarketingCheckbox: [false]
      });
    }

  get f() { return this.reactiveForm.controls }

  async onSubmit() {
    console.log('Form submitted');
    this.submitted = true;
  
     //Check if form is valid before proceeding
     if (this.reactiveForm.invalid) { 
       return;
     }

     // Simulate a successful submission
    this.submissionSuccess = true;
    
    this.submitted = false;

    // Display success message for 5.5 seconds
    setTimeout(() => {
      this.submissionSuccess = false;
      this.reactiveForm.reset();
    }, 5500);
  
    // Extract artwork IDs and quantities from cartItems
    const cartItemsData = this.cartItems.map(item => ({
      book_id: item.book_id,
      quantity: item.quantity
    }));
  
    // Check if there are valid cart items to proceed
    if (cartItemsData.length === 0) {
      console.error('Error: Invalid cart items');
      // Handle invalid cart items (e.g., show error message to the user)
      return;
    }

    const phoneNumber = this.iti ? this.iti.getNumber() : this.reactiveForm.value.phoneNumberInput; // Fallback to form input if iti is not initialized

    console.log('Phone Number:', phoneNumber);  // Debug log
  
  
    // Get form data
    const formData = {
      fName: this.reactiveForm.value.firstNameInput,
      lName: this.reactiveForm.value.lastNameInput,
      email: this.reactiveForm.value.emailInput,
      location: this.reactiveForm.value.locationInput,
      phoneNumber: phoneNumber, 
     
      paymentMethod: this.reactiveForm.value.paymentOption,
      cartItems: cartItemsData
    };
  
    console.log('Form data:', formData);
    console.log('Cart items data:', cartItemsData);
  
    // Send data to backend
    this.checkoutService.createPurchase(this.userId, formData).subscribe(
      response => {
        console.log('Purchase created successfully:', response);
        // Optionally, reset the form or show a success message
      },
      error => {
        console.error('Error creating purchase:', error);
        // Handle error (e.g., show error message to the user)
      }
    );
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quantity = +params['quantity'] || 0;
      this.price = +params['subtotal'] || 0;
      console.log(this.cartItems);
    });

    this.cartService.getCartItems(this.userId).subscribe(cartItems => {
      this.cartItems = cartItems;
      console.log('Cart items: ', this.cartItems);
    });
    this.getCustomerData(this.userId);
    
  }

  getCustomerData(userId: string): void {
    this.checkoutService.getUserDetails(userId).subscribe((data: any) => {
      console.log('User data: ', data);
      this.fiName = data.user.FName;
      this.email = data.user.email;
      this.lastName = data.user.LName;
      this.address = data.user.address;
      console.log(this.fiName);
    });
  }


  // validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
  //   const phoneNumberPattern = /^\+\d{11}$/;
  //   if (!phoneNumberPattern.test(control.value)) {
  //     return { 'phoneInvalid': true };
  //   }
  //   return null;
  // }
  validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
    const sriLankaPhonePattern = /^07\d{8}$/; // Matches numbers starting with '07' and followed by 8 digits
    if (!sriLankaPhonePattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
  

  showMessage(event: Event) {
    event.preventDefault();
    alert('You cannot change this field');
  }
}



