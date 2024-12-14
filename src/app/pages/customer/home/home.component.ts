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
  currentBookIndex: number = 0; // Index for book carousel
  currentCategoryIndex: number = 0; // Index for category carousel
  visibleBookItems: number = 4; // Number of visible book items
  visibleCategoryItems: number = 3; // Number of visible category items
  categoryItemWidth: number = 33.33; // Default item width for categories
  itemWidth: number = 25;
  gap: number = 16;
  dataLoaded: boolean = false;
  bookData: any;
  categoryData: any[] = [];
  bestSellingBooksData: any[] = [];


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
    this.loadCategoryData();
    this.getBooks();
  }

  getBestSellingBooks(): void {
    this.bookService.getBestSellingBooks().subscribe(
      (data: any[]) => {
        this.bestSellingBooksData = data; 
        this.dataLoaded = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  
  getBooks(): void {
    this.bookService.getbooks().subscribe(
      (data: any[]) => {
        this.booksData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  

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



  // Carousel movement for books
  moveBookCarousel(direction: number): void {
    const maxIndex = this.booksData.length - this.visibleBookItems;
    this.currentBookIndex += direction;

    if (this.currentBookIndex < 0) {
      this.currentBookIndex = 0;
    } else if (this.currentBookIndex > maxIndex) {
      this.currentBookIndex = maxIndex;
    }

    this.updateCarouselTransform('.book-carousel', this.currentBookIndex, this.itemWidth);
  }

  // Carousel movement for categories
  moveCategoryCarousel(direction: number): void {
    const maxIndex = this.categoryData.length - this.visibleCategoryItems;
    this.currentCategoryIndex += direction;

    if (this.currentCategoryIndex < 0) {
      this.currentCategoryIndex = 0;
    } else if (this.currentCategoryIndex > maxIndex) {
      this.currentCategoryIndex = maxIndex;
    }

    this.updateCarouselTransform('.category-carousel', this.currentCategoryIndex, this.categoryItemWidth);
  }

  updateCarouselTransform(selector: string, index: number, itemWidth: number): void {
    const carousel = document.querySelector(selector) as HTMLElement;
    if (carousel) {
      const translateValue = -(index * (itemWidth + this.gap));
      carousel.style.transform = `translateX(${translateValue}%)`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateVisibleItems();
  }

  updateVisibleItems(): void {
    const width = window.innerWidth;

    // Update visible items and widths for books
    if (width >= 1200) {
      this.visibleBookItems = 4;
      this.itemWidth = 25;
    } else if (width >= 992 && width < 1200) {
      this.visibleBookItems = 3;
      this.itemWidth = 33.33;
    } else if (width >= 768 && width < 992) {
      this.visibleBookItems = 2;
      this.itemWidth = 50;
    } else {
      this.visibleBookItems = 1;
      this.itemWidth = 100;
    }

    // Update visible items and widths for categories
    if (width >= 1200) {
      this.visibleCategoryItems = 3;
      this.categoryItemWidth = 33.33;
    } else if (width >= 768 && width < 1200) {
      this.visibleCategoryItems = 2;
      this.categoryItemWidth = 50;
    } else {
      this.visibleCategoryItems = 1;
      this.categoryItemWidth = 100;
    }

    this.updateCarouselTransform('.book-carousel', this.currentBookIndex, this.itemWidth);
    this.updateCarouselTransform('.category-carousel', this.currentCategoryIndex, this.categoryItemWidth);
  }
}


