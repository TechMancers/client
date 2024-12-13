import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit {
  goToPreview(arg0: any) {
    throw new Error('Method not implemented.');
  }
  addToCart(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @Input() book: any;
  constructor() {}

  ngOnInit(): void {
    console.log('Book page');
    console.log('Books:', this.book);
  }
}
