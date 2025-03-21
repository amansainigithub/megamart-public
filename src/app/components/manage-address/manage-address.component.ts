import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddressService } from '../../_services/addressService/address.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.css'
})

export class ManageAddressComponent {
  
  showForm = false;      // Controls when to show the form
  addresses: any = [];

  constructor(private addressService: AddressService,
              private toast: NgToastService,
              private spinner: NgxSpinnerService,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.getAddress();
  }

  addressForm: any = {
    country: "INDIA",
    customerName: null,
    mobileNumber: null,
    area: null,
    postalCode: null,
    addressLine1: null,
    addressLine2: null,
    defaultAddress: null
  };

  updateAddressForm: any = {
    country: "INDIA",
    customerName: null,
    mobileNumber: null,
    area: null,
    postalCode: null,
    addressLine1: null,
    addressLine2: null,
    defaultAddress: null
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    this.spinner.show();
    this.addressService.saveAddress(this.addressForm).subscribe({
      next: (res: any) => {
        console.log('Address saved successfully:', res);

        this.toast.success({detail: "Success", summary: "Data saved Successfully", position: "bottomRight", duration: 2000});
        this.spinner.hide();
        
        this.showForm = false;  // Hide the form after saving
        this.getAddress();
      },
      error: (err: any) => {
        console.error('Error saving address:', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }

  sortAddresses() {
    this.addresses = this.addresses.sort((a:any, b:any) => Number(b.defaultAddress) - Number(a.defaultAddress));
  }

  
  async getAddress() {
    this.spinner.show();
    this.addressService.getAddressList().subscribe({
      next: (res: any) => {

        this.addresses = res.data;

        //Sort Address
        this.sortAddresses();
        
        this.spinner.hide();
        this.showForm = this.addresses.length === 0; // Show form only if no addresses exist
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }




  deleteAddress(id:any)
  {
    this.spinner.show();
    this.addressService.deleteAddress(id).subscribe({
      next: (res: any) => {

        this.toast.success({detail: "Success", summary: "Address Removed", position: "bottomRight", duration: 2000});
        this.spinner.hide();

        //get Address List
        this.getAddress();
      },
      error: (err: any) => {
        console.error('Delete Failed', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }

  setDefaultAddress(id:any)
  {
    this.spinner.show();
    this.addressService.setDefaultAddress(id).subscribe({
      next: (res: any) => {

        this.toast.success({detail: "Success", summary: "Address Removed", position: "bottomRight", duration: 2000});
        this.spinner.hide();

        //get Address List
        this.getAddress();
      },
      error: (err: any) => {
        console.error('Delete Failed', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }



  // ===========Model Open Close===========
  modal: any;
  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('myModal'));
  }

  closeModal() {
    this.modal.hide();
  }

  getAddressById(id:any) {

    //Model Open 
    this.modal.show();

    //Progress bar Show
    this.spinner.show();

    this.addressService.getAddressById(id).subscribe({
      next: (res: any) => {
        
        console.log(res.data);
        this.updateAddressForm = res.data;
        
        this.spinner.hide();
        // this.showForm = this.addresses.length === 0; // Show form only if no addresses exist
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });

  }

  saveUpdateAddress() {
    this.spinner.show();

    console.log(this.updateAddressForm);
    
    this.addressService.updateAddress(this.updateAddressForm).subscribe({
      next: (res: any) => {
        console.log('Address update successfully:', res);

        this.toast.success({detail: "Success", summary: "Address Updated", position: "bottomRight", duration: 2000});
        this.spinner.hide();
        
        this.showForm = false;  // Hide the form after saving

        this.closeModal();

        this.getAddress();
      },
      error: (err: any) => {
        console.error('Error saving address:', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }

// =]==========================================


qrCodeUrl: string | null = null;
  amount: number | null = null;

  generateQRCode() {
    const vpa = 'amansaini1407-1@okaxis';
    const name = 'YourBusiness';
    const amount = 1;
    const transactionNote = 'Order123';

    this.http.get<any>(`http://localhost:8080/customer/api/v1/addressController/generate-qr?vpa=${vpa}&name=${name}&amount=${amount}&transactionNote=${transactionNote}`)
      .subscribe(response => {

        console.log(response);
        
        this.qrCodeUrl = response.qrCode;
        this.amount = response.amount;
      });
  }



}
