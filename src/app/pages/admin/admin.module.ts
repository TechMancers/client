import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './layout/admin.component';
import { ModalModule } from "../../shared/components/modal/modal.module";
import { AlertModule } from '../../shared/components/alert/alert.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryManagementComponent } from './category-management/category-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BookUploadComponent } from './book-upload/book-upload.component';



@NgModule({
  declarations: [
    AdminComponent,
    CategoryManagementComponent,
    UserManagementComponent,
    BookUploadComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class AdminModule { }
