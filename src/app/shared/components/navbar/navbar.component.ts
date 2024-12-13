import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  box: HTMLElement | null = null;
  down: boolean = true;
  searchTerm: string = ''; // Added property to store search term
  artist: { firebase_uid: string; artist_name: string } | undefined;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Check if the platform is a browser before accessing `document`
    if (isPlatformBrowser(this.platformId)) {
      this.box = document.getElementById('box');
    }

    this.artist = {
      firebase_uid: 'someFirebaseUid',
      artist_name: 'Artist Name'
    };
  }

  // Method to handle search form submission
  onSearchSubmit(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-art'], { queryParams: { q: this.searchTerm } });
    }
  }

  messageArtist(firebase_uid: string, artistName: string): void {
    // Save the firebase_uid to local storage
    localStorage.setItem('artistFirebaseUid', firebase_uid);
    localStorage.setItem('artistName', artistName);
    // Navigate to the chat route
    this.router.navigate(['/chat']);
  }
}