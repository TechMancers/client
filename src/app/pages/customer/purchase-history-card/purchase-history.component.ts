import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';


@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(
    private purchaseHistoryService: PurchaseHistoryService
  ){}

  userId:string='';
  purchaseData: any[] =[];


  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.userId = '1';

    }

    this.getPurchaseHistory(this.userId);
    console.log(this.purchaseData,'purchase data');
  }

  getPurchaseHistory(userId: string):void {
    console.log('userId in purchase history',userId);
    this.purchaseHistoryService.getPurchaseHistory(userId)
    .subscribe((data: any[]) => {
      this.purchaseData = data;
      console.log('purchase data',this.purchaseData);
    });
  }

  deletePurchase(purchaseId: number): void {
    this.purchaseHistoryService.deletePurchase(purchaseId)
    .subscribe(() => {
      this.getPurchaseHistory(this.userId);
    });
  }

  onPurchaseDeleted(purchaseId: number): void {
    this.purchaseData = this.purchaseData.filter(purchase => purchase.purchase_id !== purchaseId);
  }
}
