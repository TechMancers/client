import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { CartItem, Purchase } from './bookItems';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any ={}; 
  userDetails: any;
  purchaseHistory: any[] = [];
  filters: any = {
    searchQuery: '',
    isSuspended: null,
    isBanned: null,
    isActive: null,
    role: '',
  };
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(
    private userService: UserManagementService,
    public modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const queryParams = {
      search: this.filters.searchQuery || '',
      isSuspended:
        this.filters.isSuspended === null
          ? null
          : this.filters.isSuspended
          ? 1
          : 0,
      isBanned:
        this.filters.isBanned === null ? null : this.filters.isBanned ? 1 : 0,
      isActive:
        this.filters.isActive === null ? null : this.filters.isActive ? 1 : 0,
      role: this.filters.role || null,
      page: this.currentPage ? +this.currentPage : 1,
      limit: this.limit ? +this.limit : 10,
    };

    this.userService.fetchUsers(queryParams).subscribe((response) => {
      this.users = response.data;
      this.totalPages = response.pagination.totalPages;
    });
  }

  searchUsers(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  viewDetails(userId: string): void {
    this.userService.getUserDetails(userId).subscribe((user) => {
      alert(JSON.stringify(user));
    });
  }

  viewPurchaseHistory(userId: string): void {
    this.userService.getPurchaseHistory(userId).subscribe((history) => {
      alert(JSON.stringify(history));
    });
  }

  openBanModal(user: any): void {
    this.modalService.open('ban-user-modal');
    this.selectedUser = user;
  }
    

  toggleState(user: any): void {
    const action = user.isBanned ? 'unban' : 'ban'; 
    const payload = {
      isBanned: !user.isBanned,
      isActive: user.isActive === undefined ? true : !user.isActive
    };
  
    this.modalService.open('ban-user-modal');
    this.userService.updateUserState(user.user_id, payload).subscribe({
      next: (response) => {
        user.isBanned = payload.isBanned;
        user.isActive = payload.isActive;
        this.alertService.showMessage(`${action.charAt(0).toUpperCase() + action.slice(1)}d user successfully`, true);
        this.closeModal('ban-user-modal');
      },
      error: (err) => {
        console.error('Error updating user state:', err);
        this.alertService.showMessage(`Error ${action}ing user`, false);
      }
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

  openUserDetailsModal(userId: string) {
    this.userService.getUserDetails(userId).subscribe({
      next: (data) => {
        this.userDetails = data.data;
        this.modalService.open('user-details-modal');
      },
      error: () => {
        this.alertService.showMessage('Error fetching user details', false);
      },
    });
  }

  openPurchaseHistoryModal(userId: string) {
    this.userService.getPurchaseHistory(userId).subscribe({
      next: (data) => {
        if (data.success) {
          this.purchaseHistory = data.data.map((purchase: Purchase) => {
            // Ensure cartItems is always an array
            if (!Array.isArray(purchase.cartItems)) {
              purchase.cartItems = [purchase.cartItems];
            }

            // Log to check the purchase and cartItems
            console.log('Purchase:', purchase);
            console.log('Cart Items:', purchase.cartItems);

            return purchase;
          });

          console.log(this.purchaseHistory, 'purchase_history');
          this.modalService.open('purchase-history-modal');
        } else {
          let errorMessage = 'An error occurred.';
          if (data.message) {
            errorMessage = data.message;
          } else if (data.type) {
            errorMessage = `Error Type: ${data.type}`;
          }
          this.alertService.showMessage(errorMessage, false);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.alertService.showMessage('No purchase history found for this user.', false);
        } else {
          this.alertService.showMessage('Error fetching purchase history', false);
        }
      },
    });
  }

  closeModal(modalId: string) {
    this.modalService.close(modalId);
  }
}
