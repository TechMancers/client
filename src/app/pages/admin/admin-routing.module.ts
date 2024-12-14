import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin.component';

import { CategoryManagementComponent } from './category-management/category-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BookUploadComponent } from './book-upload/book-upload.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'category-management', pathMatch: 'full' },
      { path: 'category-management', component: CategoryManagementComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'book-upload', component: BookUploadComponent },
      {path:'app-book-list',component:BookListComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
