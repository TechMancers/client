import { Component } from '@angular/core';
import { ModalService } from '../../shared/components/modal/modal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private modalservice: ModalService){}

  openEditModal():void{
    this.modalservice.open('newModal');
  }
}
