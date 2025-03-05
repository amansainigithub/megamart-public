import { Component } from '@angular/core';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {

    constructor(
        private spinner: NgxSpinnerService,
        private toast:NgToastService ,
        public cartService:AddToCartService,
      ) {}

      quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

}
