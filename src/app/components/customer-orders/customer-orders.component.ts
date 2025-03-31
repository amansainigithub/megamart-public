import { Component, Input, signal } from '@angular/core';
import { OrderService } from '../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css',
})
export class CustomerOrdersComponent {
  readonly panelOpenState = signal(false);
  orders:any;


  constructor(
    private orderService: OrderService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private tokenStorageService:TokenStorageService
  ) {}

  ngOnInit(): void {

    
    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log("User is null, undefined, or an empty object");
      this.router.navigateByUrl('/login');
      return;
    }

    this.getOrderData(user.id);
  }

  async getOrderData(userId:any) {
    this.spinner.show();
    this.orderService.getCustomerOrders(userId).subscribe({
      next: (res: any) => {
        
        this.orders = res.data;
        console.log("=====================");
        
        console.log(this.orders);
        

        const user  = this.tokenStorageService.getUser();

        const isLoggedIn= !!this.tokenStorageService.getToken();
  
        if (isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          const id = user.id;
        }
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching in Order:', err);
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


  
}
