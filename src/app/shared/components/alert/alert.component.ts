import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit, OnDestroy {
  message: string = '';
  isSuccess: boolean | undefined;
  errorMessage: string = '';

  private subscription: Subscription | undefined;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.message$.subscribe((data: any) => {
      console.log('message component, ', data);
      this.message = data.message;
      this.isSuccess = data.isSuccess;
      this.errorMessage = data.errorMessage || '';

      setTimeout(() => {
        this.message = '';
      }, 4000);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
