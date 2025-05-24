import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';
import { ProductWatchingService } from '../../../_services/productsService/productWatchigService/product-watching.service';

@Component({
  selector: 'app-exchange-product',
  templateUrl: './exchange-product.component.html',
  styleUrl: './exchange-product.component.css'
})
export class ExchangeProductComponent {

  orderItem:any;
  productData:any;
  mainImage:any;

  constructor(
              private router: Router,   
              private spinner: NgxSpinnerService,
              private orderService:OrderService,
              private pwService:ProductWatchingService,
              private toast: NgToastService) 
  {
    const navigation = this.router.getCurrentNavigation();
    this.orderItem = navigation?.extras.state?.['orderData'];
  }

  ngOnInit() {
    if (!this.orderItem || Object.keys(this.orderItem).length === 0) {
     this.router.navigate(['/']);
    } else {
      this.getProductById(this.orderItem.productId);
    }
  }

  //GET Product Byid Starting..
  getProductById(productId:any){
    this.spinner.show();
    this.pwService.getProductByIdCustomer(productId, "pN").subscribe({
      next: (res: any) => {
        this.productData = res.data.pw;
        //Set Image
        this.mainImage = res.data.pw.productFilesResponses[0].fileUrl;
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
      },
    });
  
  //GET Product Byid Ending
  }


//Selected Label
productLabel: string | null = null;
selectLabel(label: string) {
  this.productLabel = label;
}

exchangeForm:any={
  exchangeReason:"",
  selectedLabel:"",
  productId:"",
  orderItemId:""
}
exchangeRequestInitiated(){
  this.exchangeForm.selectedLabel = this.productLabel;
  this.exchangeForm.productId = this.orderItem.productId;
  this.exchangeForm.orderItemId = this.orderItem.id;
  
    this.spinner.show();
    this.orderService.orderExchangeRequestInitiate(this.exchangeForm).subscribe({
      next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Return Order Request Initiated Success...',
            position: 'bottomRight',
            duration: 2000,
          });
          this.spinner.hide();

          this.router.navigateByUrl('/customer/my-orders')
      },
      error: (err: any) => {

        this.toast.error({
          detail: 'Failed',
          summary: 'Return Order Request Initiated Failed...',
          position: 'bottomRight',
          duration: 2000,
        });

        this.spinner.hide();
      },
    });
  
}
}
