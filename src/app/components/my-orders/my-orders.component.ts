import { Component } from '@angular/core';
import { OrderService } from '../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  orders:any;
  userId:any;
  totalElements: number = 0;


  constructor(
    private orderService: OrderService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private tokenStorageService:TokenStorageService
  ) {}

  ngOnInit(): void {
    
    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.userId = user.id;
    this.getMyOrders(user.id, { page: "0", size: "20" });
  }

  getMyOrders(userId:any , request:any) {
    this.spinner.show();
    this.orderService.getMyOrdersDelivered(userId,request).subscribe({
      next: (res: any) => {
        this.orders = res.data.content;
        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching in my-orders:', err);
        this.spinner.hide();
      },
    });
  }



  //TRACKING SATEPPER STARTING
  statuses = ['PENDING', 'SHIPPED', 'OUT_OF_DELIVERY', 'DELIVERED'];
  getStatusIndex(status: string): number {
    return this.statuses.indexOf(status);
  }

  copyTrackerId(trackerId: number) {
    navigator.clipboard.writeText(trackerId.toString()).then(() => {
      this.toast.success({detail: "Success", summary: "Tracker ID copied !", position: "bottomRight", duration: 2000});
    }).catch(err => {
      console.error('Failed to copy tracker ID:', err);
    });
  }
  //TRACKING STEPPER ENDING


  



  
  // model Properties Starting
  returnExchangeModel: any;
  ngAfterViewInit() {
    this.returnExchangeModel = new bootstrap.Modal(
      document.getElementById('returnExchangeModel')
    );
  }

  order:any;
  returnExchange:any;
  returnExchangeModelOpen(order:any , returnExchange:any) {
    this.order = order;
    this.returnExchange = returnExchange;
    this.returnExchangeModel.show();
  }

  returnExchangeModelClose() {
    this.returnExchangeModel.hide();
  }
  // model Properties Ending

  refundForm = {
    cancelReason: '',
  };


  // model Properties ENDING

  
  finalJudgementCancelOrder() {
    if(this.returnExchange === 'R')
    {
      this.returnExchangeModelClose();
      this.router.navigate(['/customer/returnProduct'], { state: { orderData: this.order } });
    
    }
    else if(this.returnExchange === 'E')
    { 
      this.returnExchangeModelClose();
      this.router.navigate(['/customer/exchangeProduct'], { state: { orderData: this.order } });
    }else{
      this.toast.warning({detail: "ERROR", summary: "Something Went Wrong", position: "topRight", duration: 2000});
    }
  }


  downloadInvoice(orderId: any) {

    this.spinner.show();
    this.orderService.invoiceDownload(orderId).subscribe({
      next: (res: any) => {

        // Assuming the response is a binary PDF file
        const blob = new Blob([res], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${orderId}.pdf`;
        link.click();
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
      },
    });
    
    }



      nextPage(event: PageEvent) {
        const request:any = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
         this.getMyOrders(this.userId, { page: "0", size: "20" });
    }
    












}
