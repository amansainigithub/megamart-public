import { Component, inject } from '@angular/core';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { RazorpayService } from '../../_services/payments/razorpayService/razorpay.service';
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
    private router:Router,
  ) {}

  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);




  proceedToPay(){

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log("User is null, undefined, or an empty object");
      this.router.navigateByUrl('/login');
      return;
    }else{
      this.router.navigateByUrl('pay/proceedToPay');
    }

  }


}



















