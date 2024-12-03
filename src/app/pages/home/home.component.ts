import { Component, HostListener, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit  {
 

  
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }



  ngOnInit(): void {
  
  }

  categories = [
    { name: 'Children\'s Books', image: 'https://www.booktrust.org.uk/globalassets/images/news-and-features/blogs-2023/december/author-books-of-2023-16x9.jpg?w=1200&h=675&quality=70&anchor=middlecenter' },
    { name: 'Fiction', image: 'https://www.scholastic.com/content/dam/scholastic/educators/book-lists/110823-historical-fiction-nonfiction-16-9.png.corpimagerendition.xxl.1400.788.png' },
    { name: 'Non-fiction', image: 'https://www.scholastic.com/content/dam/scholastic/educators/book-lists/nonfiction-books-grades-1-2-16-9.png.corpimagerendition.xxl.1400.788.png' },
    
    
    { name: 'Mystery & Thriller', image: 'https://www.usatoday.com/gcdn/presto/2023/03/30/USAT/20d038bf-d2d5-46f1-9628-de1f6508ff12-Summer_trillers_2023-collage.jpg?crop=3263,1836,x0,y709&width=660&height=371&format=pjpg&auto=webp' },
    { name: 'Fantasy', image: 'https://www.beyondthebookends.com/wp-content/uploads/2024/09/Fantasy-Books-for-Tweens.jpg' },
    { name: 'Romance', image: 'https://www.usatoday.com/gcdn/authoring/authoring-images/2024/03/29/USAT/73150237007-romance-books-for-summer.jpg?crop=3199,2401,x0,y49' }
  ];

  currentIndex: number = 0;

  moveCarousel(direction: number): void {
    const itemWidth = 400; // Item width + margin (adjust based on CSS)
    const visibleItems = Math.floor(document.querySelector('.carousel-container')!.clientWidth / itemWidth);

    // Update the current index
    this.currentIndex += direction;

    // Ensure the index stays in bounds
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    } else if (this.currentIndex > this.categories.length - visibleItems) {
      this.currentIndex = this.categories.length - visibleItems;
    }

    // Move the carousel
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`;
  }

  

}

 
  
