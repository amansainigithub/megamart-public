import { Component } from '@angular/core';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { RazorpayService } from '../../_services/payments/razorpayService/razorpay.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

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
    private razorpayService: RazorpayService,
    private tokenStorageService:TokenStorageService,
    private router:Router
  ) {}

  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  //Razorpay Integration Working Starting
  razorpayKey = 'rzp_test_cFBctGmM8MII0E';
  amountPaying(amount: any) {

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log("User is null, undefined, or an empty object");
      this.router.navigateByUrl('/login');
      return;
    }

    //Check isValid Cart items
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(cart); // Check if cart is correctly retrieved


    this.razorpayService.createOrderPaymentService(amount , cart ).subscribe({
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
            this.paymentUpdate(response , cart);

            //Clear Cart Items
            localStorage.removeItem('cart');
            this.router.navigateByUrl('/home');
            
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

  paymentUpdate(paymentTransaction:any ,cart:any) {

    paymentTransaction.cartItems = cart; // Add cart to the paymentTransaction object
    console.log(paymentTransaction); // Check the updated object before sending

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



















