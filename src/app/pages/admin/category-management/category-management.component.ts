import { Component, AfterViewInit } from '@angular/core';
import { CategoryManagementService } from './category-management.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css',
})
export class CategoryManagementComponent implements AfterViewInit {
  categories: any[] = [];

  constructor(
    private categoryService: CategoryManagementService,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngAfterViewInit() {
    this.categoryService.getCategorylist().subscribe((data) => {
      this.categories = data;
    });
  }

  openModal(category: any) {
    this.modalService.open(category);
  }

  createCategory(category: any) {
    this.categoryService.createCategory(category).subscribe((data) => {
      this.alertService.showMessage('Category created successfully', true);
      this.categoryService.getCategorylist().subscribe((data) => {
        this.categories = data;
      });
    });
  }

  updateCategory(category: any) {
    this.categoryService
      .updateCategory(category._id, category)
      .subscribe((data) => {
        this.alertService.showMessage('Category updated successfully', true);
        this.categoryService.getCategorylist().subscribe((data) => {
          this.categories = data;
        });
      });
  }

  deleteCategory(category: any) {
    this.categoryService.deleteCategory(category._id).subscribe((data) => {
      this.alertService.showMessage('Category deleted successfully', true);
      this.categoryService.getCategorylist().subscribe((data) => {
        this.categories = data;
      });
    });
  }
}
