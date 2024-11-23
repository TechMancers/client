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

}

 
  
