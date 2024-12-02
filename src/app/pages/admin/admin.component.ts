import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ModalService } from '../../shared/components/modal/modal.service';
import { navbarData } from './nav-data';
import { SideNavToggle } from './SideNavToggle';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

import { AdminService } from './admin.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  animations: [
    trigger('rotate',[
      transition(':enter', [
        animate('500ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: 0}),
          style({transform: 'rotate(1turn)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  navData = navbarData; 
  screenWidth = 0;

  adminId:string='';
  adminDetails:any = {
    profile_photo: null,
    name: '',
    email: ''
  };

  passwordDetails:any = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  profilePictureObj: File | undefined;
  profilePictureUrl: string = '';
  uploadProgress: number | undefined;
  imageObj: File | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    } else {
      this.collapsed = true;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

    }
  }

  constructor(
    private modalservice: ModalService,
    private router: Router,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.adminId = localStorage.getItem('admin_id') || '';
      this.loadAdminDetails(this.adminId);
    }
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }
  }

  loadAdminDetails(adminId: string): void {
    this.adminService.getAdminDetails(adminId).subscribe(
      (data:any) => {
        console.log('Admin details', data);
        this.adminDetails = data.admin;
        this.profilePictureUrl = data.admin.profile_photo || ''; 
        this.passwordDetails.currentPassword = data.admin.password;
      },
      error => {
        console.error('Error fetching admin details', error);
      }
    );
  }

  openEditModal():void{
    this.modalservice.open('newModal');
  }
}
