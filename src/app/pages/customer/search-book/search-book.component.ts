import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBookService } from './search-book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  searchResults: any[] = [];
  originalSearchResults: any[] = [];
  categories: any[] = [];
  selectedCategories: string[] = [];
  selectedOption: string = 'title-asc';
  priceMin: number = 0;
  selectedPrice: number = 500;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private searchBookService: SearchBookService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['category_id'];
      console.log('Category ID:', categoryId);
      if (categoryId) {
    this.getBooksByCategoryId(categoryId);
      this.searchQuery = params['q'];
      if (this.searchQuery) {
        this.searchBookService.searchBooks(this.searchQuery).subscribe(
          (results: any[]) => {
            this.searchResults = results;
            this.originalSearchResults = [...results];
            this.applyFilters();
          },
          (error: any) => {
            console.error('Error fetching search results:', error);
          }
        );
      }
      }
    });

    this.searchBookService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();

    const newLocal = this;
    newLocal.searchBookService.searchBooks(searchKeyword).subscribe(
      (results: any[]) => {
        this.searchResults = results;
        this.originalSearchResults = [...results];
        this.applyFilters();
      },
      (error: any) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  updateCategoryFilter(event: any, categoryValue: string): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryValue);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== categoryValue);
    }
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption = value;
    this.applyFilters();
  }

  onPriceRangeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedPrice = parseInt(target.value);
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredResults = this.searchResults;

    if (this.selectedCategories.length > 0) {
      filteredResults = filteredResults.filter(book =>
        this.selectedCategories.includes(book.category_name)
      );
    } else {
      filteredResults = [...this.originalSearchResults];
    }

    filteredResults = filteredResults.filter(
      book =>
        book.book_price >= this.priceMin &&
        book.book_price <= this.selectedPrice
    );

    this.sortBooks(filteredResults);
  }

  sortBooks(results: any[]): void {
    switch (this.selectedOption) {
      case 'title-asc':
        results.sort((a, b) => a.book_title.localeCompare(b.book_title));
        break;
      case 'title-desc':
        results.sort((a, b) => b.book_title.localeCompare(a.book_title));
        break;
      case 'date-asc':
        results.sort((a, b) => new Date(a.published_date).getTime() - new Date(b.published_date).getTime());
        break;
      case 'date-desc':
        results.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
        break;
      case 'price-asc':
        results.sort((a, b) => a.book_price - b.book_price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.book_price - a.book_price);
        break;
      case 'popularity-asc':
        results.sort((a, b) => a.total_likes - b.total_likes);
        break;
      case 'popularity-desc':
        results.sort((a, b) => b.total_likes - a.total_likes);
        break;
      default:
        break;
    }
    this.searchResults = results;
  }

  getBooksByCategoryId(categoryId: number): void {
    console.log('Fetching books by category:', categoryId);
    this.searchBookService.getBooksByCategoryId(categoryId).subscribe(
      (results: any[]) => {
        this.searchResults = results;
        this.originalSearchResults = [...results];
        this.applyFilters();
      },
      (error: any) => {
        console.error('Error fetching books by category:', error);
      }
    );
  }
}
