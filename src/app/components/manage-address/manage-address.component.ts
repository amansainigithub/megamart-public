import { Component } from '@angular/core';
import { AddressService } from '../../_services/addressService/address.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.css'
})
export class ManageAddressComponent {
  isSuccessful = false;


  ngOnInit(): void {
    this.getAddress()
  }

  constructor(private addressService:AddressService,
              private toast:NgToastService,
              private spinner: NgxSpinnerService,
  ){
  }


  addressForm: any = {
    country:"INDIA",
    customerName: null,
    mobileNumber: null,
    area:null,
    postalCode:null,
    addressLine1:null,
    addressLine2:null,
    defaultAddress:null
  };
  

    onSubmit()
    {
      this.spinner.show();
      this.addressService.saveAddress(this.addressForm).subscribe({
        next: (res: any) => {
        console.log('Address saved successfully:', res);

        this.toast.success({detail:"Success",summary:"Data saved Success", position:"bottomRight",duration:2000});
        this.spinner.hide();
        },
        error: (err: any) => {
          console.error('Error saving address:', err);
          this.toast.error({detail:"Error",summary:"Something went Wrong", position:"bottomRight",duration:2000});
          this.spinner.hide();
        }
      });
    }


    addresses:any;
    getAddress()
    {
      this.spinner.show();
      this.addressService.getAddressList().subscribe({
        next: (res: any) => {
          this.addresses =res.data;
        console.log('Address Fetch Success', res);

        this.toast.success({detail:"Success",summary:"Address Fetch Success", position:"bottomRight",duration:2000});
        this.spinner.hide();
        },
        error: (err: any) => {
          console.error('Error Fetch  Address ! Failed :', err);
          this.toast.error({detail:"Error",summary:"Something went Wrong", position:"bottomRight",duration:2000});
          this.spinner.hide();
        }
      });
    }


}
