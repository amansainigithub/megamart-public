import { Component, Input, signal } from '@angular/core';
import { OrderService } from '../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { CancleOrderService } from '../../_services/cancleOrders/cancle-order.service';


declare var bootstrap: any; // Import Bootstrap JavaScript
@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css',
})
export class CustomerOrdersComponent {
  readonly panelOpenState = signal(false);
  orders: any;

  constructor(
    private orderService: OrderService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private cancleOrderService: CancleOrderService
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log('User is null, undefined, or an empty object');
      this.router.navigateByUrl('/login');
      return;
    }

    this.getOrderData(user.id);
  }

  async getOrderData(userId: any) {
    this.spinner.show();
    this.orderService.getCustomerOrders(userId).subscribe({
      next: (res: any) => {
        // console.log(res.data);

        this.orders = res.data;
        const user = this.tokenStorageService.getUser();
        const isLoggedIn = !!this.tokenStorageService.getToken();
        
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
    navigator.clipboard
      .writeText(trackerId.toString())
      .then(() => {
        this.toast.success({
          detail: 'Success',
          summary: 'Tracker ID copied !',
          position: 'bottomRight',
          duration: 2000,
        });
      })
      .catch((err) => {
        console.error('Failed to copy tracker ID:', err);
      });
  }
  //TRACKING STEPPER ENDING














  cancelModel:any=true;
  paymentMode:any=true;
  cancleOrderObject: any = {
    id: '',
    customerOrderNumber: '',
    razorpayOrderId: '',
    cancelReason: '',
  };
  // calcle Order Process Starting
  cancelOrder(orders: any) {
    console.log(orders);
    this.paymentMode = orders.paymentMode;
    if (
      orders &&
      orders.id &&
      orders.customOrderNumber &&
      orders.razorpayOrderId
    ) {
      this.cancleOrderObject.id = orders.id;
      this.cancleOrderObject.customerOrderNumber = orders.customOrderNumber;
      this.cancleOrderObject.razorpayOrderId = orders.razorpayOrderId;

      //Open Cancle Model
      this.cancelModelOpen();
    } else {
      console.warn('Invalid order data:', orders);
    }
  }

  refundForm = {
    cancelReason: '',
  };

  finalJudgementCancelOrder() {
    console.log(this.cancleOrderObject);

    //Set Cancel Readon to Cancel-Order-Object
    this.cancleOrderObject.cancelReason = this.refundForm.cancelReason;
    this.cancleOrderService
      .cancelOrderServic(this.cancleOrderObject)
      .subscribe({
        next: (res: any) => {
          console.log('Cancel Order ', res);

          console.log('Cancel Order Success..', res);
          this.toast.success({
            detail: 'Success',
            summary: 'Cancel Order Success..',
            position: 'bottomRight',
            duration: 2000,
          });
          this.spinner.hide();

          //close Model
          this.cancelModel =false;


          const user = this.tokenStorageService.getUser();
          this.getOrderData(user.id);
        },
        error: (err: any) => {
          console.error('Error saving address:', err);
          this.toast.warning({
            detail: 'Cancel Order',
            summary:
              'An error occurred while cancelling the order. Please try again after some time.',
            position: 'bottomRight',
            duration: 2000,
          });
          this.spinner.hide();
          
          //close Model
        },
      });
  }

  // In your component.ts
redirectToHome() {
  this.cancelModelClose();
  window.location.href = '/home'; 
}









  // model Properties Starting

  orderCancelModel: any;
  ngAfterViewInit() {
    this.orderCancelModel = new bootstrap.Modal(
      document.getElementById('orderCancelModel')
    );
  }

  cancelModelOpen() {
    this.orderCancelModel.show();
  }

  cancelModelClose() {
    this.orderCancelModel.hide();
    this.cancelModel = true;
  }
  // model Properties Ending
}
