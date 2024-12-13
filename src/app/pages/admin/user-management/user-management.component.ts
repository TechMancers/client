import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;


  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const queryParams = { page: this.currentPage, query: this.searchQuery };
    console.log('Query Params:', queryParams, 'Current Page:', this.currentPage);
    this.userService.fetchUsers(queryParams).subscribe((response) => {
      this.users = response.data;
      this.hasMore = response.hasMore;
    });
  }

  searchUsers(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  loadPage(page: number): void {
    if (page < 1) return;
    this.currentPage = page;
    this.loadUsers();
  }

  viewDetails(userId: string): void {
    this.userService.getUserDetails(userId).subscribe((user) => {
      console.log('User Details:', user);
      alert(JSON.stringify(user));
    });
  }

  viewPurchaseHistory(userId: string): void {
    this.userService.getPurchaseHistory(userId).subscribe((history) => {
      console.log('Purchase History:', history);
      alert(JSON.stringify(history));
    });
  }

  toggleState(user: any): void {
    const payload = { isBanned: !user.isBanned };
    this.userService.updateUserState(user.id, payload).subscribe(() => {
      user.isBanned = !user.isBanned;
    });
  }

  openSuspendDialog(user: any): void {
    const reason = prompt('Enter suspension reason:');
    const suspendEnd = prompt('Enter suspension end date (YYYY-MM-DD):');
    if (reason && suspendEnd) {
      const payload = { isSuspended: true, suspendReason: reason, suspendEnd };
      this.userService.suspendUser(user.id, payload).subscribe(() => {
        alert('User suspended successfully');
      });
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
      });
    }
  }
}
