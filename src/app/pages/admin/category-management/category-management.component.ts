import { Component, AfterViewInit } from '@angular/core';
import { CategoryManagementService } from './category-management.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements AfterViewInit {
  categories: any[] = [];
  selectedCategory: any = { name: '' };
  editCategoryName = '';
  newCategoryName = '';
  categoryToDelete: any = null;

  constructor(
    private categoryService: CategoryManagementService,
    public modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngAfterViewInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategorylist().subscribe((data) => {
      this.categories = data;
    });
  }

  openEditCategoryModal(category: any) {
    this.selectedCategory = { ...category }; 
    this.modalService.open('edit-category-modal');
  }

  updateCategory(category: any) {
    this.categoryService.updateCategory(category._id, category).subscribe({
      next: () => {
        this.alertService.showMessage('Category updated successfully', true);
        this.loadCategories();
        this.closeModal('edit-category-modal');
      },
      error: () =>
        this.alertService.showMessage('Error updating category', false),
    });
  }

  deleteCategory(category: any) {
    this.categoryService.deleteCategory(category.category_id).subscribe({
      next: () => {
        this.alertService.showMessage('Category deleted successfully', true);
        this.loadCategories();
        this.closeModal('delete-category-modal');
      },
      error: () =>
        this.alertService.showMessage('Error deleting category', false),
    });
  }

  addNewCategory() {
    const newCategory = { name: this.newCategoryName };
    this.categoryService.createCategory(newCategory).subscribe({
      next: () => {
        this.alertService.showMessage('Category added successfully', true);
        this.loadCategories();
        this.closeModal('add-category-modal');
        this.newCategoryName = ''; // Reset the input field
      },
      error: () =>
        this.alertService.showMessage('Error adding category', false),
    });
  }

  closeModal(modalId: string) {
    this.modalService.close(modalId);
  }

  openDeleteConfirm(category: any) {
    this.selectedCategory = { ...category };
    this.modalService.open('delete-category-modal');
  }

  openAddCategoryModal() {
    this.modalService.open('add-category-modal');
  }
}
