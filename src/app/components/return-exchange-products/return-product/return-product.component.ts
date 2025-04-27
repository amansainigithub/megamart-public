import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../../_services/orderService/order.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-return-product',
  templateUrl: './return-product.component.html',
  styleUrl: './return-product.component.css'
})
export class ReturnProductComponent {

orderData: any;

constructor(
            private router: Router,   
            private spinner: NgxSpinnerService,
            private orderService:OrderService,
            private toast: NgToastService) 
{
  const navigation = this.router.getCurrentNavigation();
  this.orderData = navigation?.extras.state?.['orderData'];
}

ngOnInit() {
  if (!this.orderData || Object.keys(this.orderData).length === 0) {
   // this.router.navigate(['/']);
  } else {
    console.log('Received order data:', this.orderData);
  }
}

returnExchangeForm = {
  id: '',
  returnReason: '',
  accountNumber: '',
  ifscCode: '',
  bankName: ''
};

formSubmitted = false;

submitForm(form: any) {
  this.formSubmitted = true;

  if (form.valid) {
    console.log('Form Data:', this.returnExchangeForm);
    // Yahan API call ya next process karna

    this.returnExchangeForm.id = this.orderData.id;

    this.spinner.show();
    this.orderService.orderReturnRequestInitiate(this.returnExchangeForm).subscribe({
      next: (res: any) => {

        console.log('Return Order Request Initiated Success', res);
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
        console.error('Error fetching in my-orders:', err);

        this.toast.error({
          detail: 'Failed',
          summary: 'Return Order Request Initiated Failed...',
          position: 'bottomRight',
          duration: 2000,
        });

        this.spinner.hide();
      },
    });
    
  } else {
    console.log('Form Invalid!');
  }
}

onActionTypeChange(action: string) {

  // Reset bank fields if Exchange selected
  if (action === 'Exchange') {
    this.returnExchangeForm.accountNumber = '';
    this.returnExchangeForm.ifscCode = '';
    this.returnExchangeForm.bankName = '';
  }
}


}