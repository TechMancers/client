import { Component,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() selected: boolean = false;
  @Input() categoryId!:number ;

  @Output() selectionChange = new EventEmitter<{ categoryId: number, selected: boolean }>();
  
 
  constructor() { 
  }

  toggleSelection(): void {
    this.selected = !this.selected;
    this.selectionChange.emit({ categoryId: this.categoryId, selected: this.selected });
  }
   
}
