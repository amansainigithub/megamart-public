import { Component, Input, signal } from '@angular/core';
import { OrderService } from '../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';

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
    private tokenStorageService:TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getOrderData();
  }



  // orders = [
  //   {
  //     id: 'ORD12345',
  //     items: [
  //       {
  //         image: '../../../assets/images/wear2.jpg',
  //         title: 'COMBO OF The Art of Not Overthinking...',
  //         deliveryDate: '29 March, 2025',
  //         quantity: 1,
  //         price: 499,
  //       },
  //       {
  //         image: '../../../assets/images/wear.jpg',
  //         title: 'THANK YOU FOR LEAVING BY RITHVIK SINGH',
  //         deliveryDate: '29 March, 2025',
  //         quantity: 2,
  //         price: 799,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'ORD12345',
  //     items: [
  //       {
  //         image: '../../../assets/images/wear.jpg',
  //         title: 'FIRE SHIRTS & TSHIRTS Not Overthinking...',
  //         deliveryDate: '29 March, 2025',
  //         quantity: 1,
  //         price: 499,
  //       },
  //     ],
  //   },
  // ];

  async getOrderData() {
    this.spinner.show();
    this.orderService.getCustomerOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;

        const user  = this.tokenStorageService.getUser();

        const isLoggedIn= !!this.tokenStorageService.getToken();
  
        if (isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          const id = user.id;
        }
        console.log(this.orders);
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching in Order:', err);
        this.spinner.hide();
      },
    });
  }



  //TRACKING SATEPPER STARTING
  statuses = ['PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'];

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
