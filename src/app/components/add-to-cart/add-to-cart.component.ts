import { Component } from '@angular/core';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { RazorpayService } from '../../_services/payments/razorpayService/razorpay.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    public cartService: AddToCartService,
    private razorpayService: RazorpayService
  ) {}

  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  //Razorpay Integration Working Starting
  razorpayKey = 'rzp_test_cFBctGmM8MII0E';
  amountPaying(amount: any) {
    alert('Amount:: ' + amount);

    this.razorpayService.createOrderPaymentService(amount).subscribe({
      next: (res: any) => {
        console.log(res);
        const parsedResponse = JSON.parse(res.data);
        
      
        const options = {
          key: this.razorpayKey,
          amount: parsedResponse.amount,
          currency: 'INR',
          name: 'Your Company',
          description: 'Test Transaction',
          order_id: parsedResponse.id,
          handler: (response: any) => {
            console.log('Payment Success:', response);
            //alert('Payment Successful!');

            //update Pament to Database
            this.paymentUpdate(response);
          },
          prefill: {
            name: 'Aman Saini',
            email: 'Aman@example.com',
            contact: '9818644154'
          },
          theme: {
            color: '#3399cc'
          } ,
          
            modal: {
              escape: false,
              backdropclose: false,
              ondismiss: () => {
                console.log('Payment popup closed by user');
                alert('Payment popup closed before completing the transaction.');
              }
            },
            error: (error: any) => {
              console.log('Payment Failed:', error);
              alert(`Payment Failed! Reason: ${error.error.description}`);
            }
          };

        const rzp = new Razorpay(options);
        rzp.open();

      },
    });
  }





  paymentUpdate(paymentTransaction:any) {
    this.razorpayService.paymentTransaction(paymentTransaction).subscribe(
      (data) => {
        Swal.fire({
          title: 'Congratulations',
          text: 'Payment Complete Success',
          icon: 'success',
        });
      },
      (err) => {
        alert('Registeration Failed');
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }












}



















