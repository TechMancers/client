import { Component, OnInit } from '@angular/core';
import { CustomerProfileService } from './customer-profile.service';
// import { CustomerDataService } from '../../../shared/services/customerData.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {

  CustomerData: any = {};
  booksData: any[] = [];
  filteredBooks: any[] = [];
  userId:string='';

  constructor(
    public CustomerProfileService: CustomerProfileService,
    // private customerDataService: CustomerDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.userId = 'Cu-00001';

    }

    this.getAllCustomers(this.userId);
    this.getCustomerWishList(this.userId);
  }

  onItemRemoved(book_id:string){
    console.log('Item removed', book_id);
    this.getCustomerWishList(this.userId);
  }

  getAllCustomers(userId: string): void {
    this.CustomerProfileService.getAllCustomers(userId).subscribe(
      (data: any[]) => {
        this.CustomerData = data[0];
        // this.customerDataService.setCustomerData(data[0]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



  getCustomerWishList(userId: string): void {
    this.CustomerProfileService.getCustomerWishList(userId).subscribe(
      (data: any[]) => {
        this.booksData = data.map((book: any) => ({
          book_image_url: book.book_image_url,
          book_name: book.book_name,
          book_price: book.book_price,
          author_name: book.author_name,
          total_likes: book.total_likes,
          book_id: book.book_id
        }));
        this.filteredBooks = this.booksData;
        console.log(this.filteredBooks);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();
    console.log(searchKeyword);

    if (searchKeyword === '') {
      this.filteredBooks = this.booksData;
    } else {
      this.filteredBooks = this.booksData.filter((book) =>
        book.artwork_name.toLowerCase().includes(searchKeyword) ||
        book.artist_name.toLowerCase().includes(searchKeyword)
      );
    }
  }

  deactivateCustomer(): void {
    const confirmed = confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (confirmed) {
      const userId = Number(this.userId);
      this.CustomerProfileService.deactivateCustomer(this.userId).subscribe(
        (response: any) => {
          console.log(response.message);
          alert('Your profile has been deleted successfully.');
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.log(error);
          alert('Error deactivating the profile.');
        }
      );
    }
  }

  logout(): void{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin_id');
    this.router.navigate(['/']);
  }

  onUnfollowing(){

  }

}
