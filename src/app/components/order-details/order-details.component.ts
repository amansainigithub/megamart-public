import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../_services/orderService/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderData: any;

  orders:any

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toast: NgToastService,
      private spinner: NgxSpinnerService,) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log('Order ID:', orderId);
    this.getCustomerOrdersById(orderId);
  }


  copyTrackerId(trackerId: number) {
    navigator.clipboard.writeText(trackerId.toString()).then(() => {
      this.toast.success({detail: "Success", summary: "Tracker ID copied !", position: "bottomRight", duration: 2000});
    }).catch(err => {
      console.error('Failed to copy tracker ID:', err);
    });
  }


  totalMrp: number = 0;
  totalDiscount:number = 70;
  async getCustomerOrdersById(orderId:any) {
    this.spinner.show();
    this.orderService.getCustomerOrdersById(orderId).subscribe({
            next: (res: any) => {
              console.log(res);
              
              this.orders = res.data;
            //   res.data.customerOrderItems.forEach((item: any) => {
            //     const quantity = !isNaN(Number(item.quantity)) ? Number(item.quantity) : 0;
            //     const mrp = !isNaN(Number(item.productMrp)) ? Number(item.productMrp) : 0;
                
            //     this.totalMrp += Number(mrp * quantity);
            // });
            console.log(this.orders);
            this.spinner.hide();
          },
      error: (err: any) => {
        console.error('Error fetching in Order:', err);
        this.spinner.hide();
      },
    });
  }

}
