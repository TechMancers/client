import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './service/book.service';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  booksData: any = {};
  currentIndex: number = 0;
  currentArtistIndex: number = 0;
  itemWidth: number = 25;
  gap: number = 16;
  dataLoaded: boolean = false;
  bookData: any;
  categoryData: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getBestSellingBooks();
    this.updateItemWidth();
    this.loadCategoryData();
  }

  getBestSellingBooks(): void {
    this.bookService.getBestSellingBooks().subscribe(
      (data: any[]) => {
        this.booksData = data;
        this.dataLoaded = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  next(): void {
    if (this.currentIndex < this.bookData.length - 100 / this.itemWidth) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel('.book-carousel', this.currentIndex);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.bookData.length - 100 / this.itemWidth;
    }
    this.updateCarousel('.book-carousel', this.currentIndex);
  }

  updateCarousel(selector: string, index: number): void {
    const carousel = document.querySelector(selector) as HTMLElement;
    const gapAdjustment = (this.gap / window.innerWidth) * 100;
    const translateValue = -(index * (this.itemWidth + gapAdjustment));
    carousel.style.transform = `translateX(${translateValue}%)`;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateItemWidth();
  }

  updateItemWidth(): void {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.itemWidth = 25;
    } else if (width >= 992 && width < 1200) {
      this.itemWidth = 33.33;
    } else if (width >= 768 && width < 992) {
      this.itemWidth = 50;
    } else {
      this.itemWidth = 100;
    }
    this.updateCarousel('.book-carousel', this.currentIndex);
  }

  // categories = [
  //   { name: 'Children\'s Books', image: 'https://www.booktrust.org.uk/globalassets/images/news-and-features/blogs-2023/december/author-books-of-2023-16x9.jpg?w=1200&h=675&quality=70&anchor=middlecenter' },
  //   { name: 'Fiction', image: 'https://www.scholastic.com/content/dam/scholastic/educators/book-lists/110823-historical-fiction-nonfiction-16-9.png.corpimagerendition.xxl.1400.788.png' },
  //   { name: 'Non-fiction', image: 'https://www.scholastic.com/content/dam/scholastic/educators/book-lists/nonfiction-books-grades-1-2-16-9.png.corpimagerendition.xxl.1400.788.png' },

  //   { name: 'Mystery & Thriller', image: 'https://www.usatoday.com/gcdn/presto/2023/03/30/USAT/20d038bf-d2d5-46f1-9628-de1f6508ff12-Summer_trillers_2023-collage.jpg?crop=3263,1836,x0,y709&width=660&height=371&format=pjpg&auto=webp' },
  //   { name: 'Fantasy', image: 'https://www.beyondthebookends.com/wp-content/uploads/2024/09/Fantasy-Books-for-Tweens.jpg' },
  //   { name: 'Romance', image: 'https://www.usatoday.com/gcdn/authoring/authoring-images/2024/03/29/USAT/73150237007-romance-books-for-summer.jpg?crop=3199,2401,x0,y49' }
  // ];

  // currentIndex1: number = 0;

  // moveCarousel(direction: number): void {
  //   const itemWidth = 400; // Item width + margin (adjust based on CSS)
  //   const visibleItems = Math.floor(document.querySelector('.carousel-container')!.clientWidth / itemWidth);

  //   // Update the current index
  //   this.currentIndex1 += direction;

  //   // Ensure the index stays in bounds
  //   if (this.currentIndex1 < 0) {
  //     this.currentIndex1 = 0;
  //   } else if (this.currentIndex1 > this.categories.length - visibleItems) {
  //     this.currentIndex1 = this.categories.length - visibleItems;
  //   }

  //   // Move the carousel
  //   const carousel = document.querySelector('.carousel') as HTMLElement;
  //   carousel.style.transform = `translateX(-${this.currentIndex1 * itemWidth}px)`;
  // }

  loadCategoryData(): void {
    this.categoryService.getcategories().subscribe(
      (data: any[]) => {
        console.log('Category data: ', data);
        console.log('Category data: ', data[0].category_id);

        this.categoryData = data;
      },
      (error) => {
        console.error('Error fetching category data: ', error);
      }
    );
  }
  // navigateToCategory(categoryId: string): void {
  //   console.log('Navigating to category:', categoryId);
  //   this.router.navigate(['/'], { queryParams: { category_id: categoryId } });
  // }
}
