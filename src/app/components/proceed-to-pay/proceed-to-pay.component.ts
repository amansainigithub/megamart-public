import { Component } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { AddressService } from '../../_services/addressService/address.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { RazorpayService } from '../../_services/payments/razorpayService/razorpay.service';
import { Router } from '@angular/router';

declare var bootstrap: any; // Import Bootstrap JavaScript
declare var Razorpay: any;

@Component({
  selector: 'app-proceed-to-pay',
  templateUrl: './proceed-to-pay.component.html',
  styleUrl: './proceed-to-pay.component.css'
})
export class ProceedToPayComponent {
  
    states: string[] = [
    'Andhra Pradesh',
    'Bihar',
    'Delhi',
    'Gujarat',
    'Karnataka',
    'Maharashtra',
    'Rajasthan',
    'Tamil Nadu',
    'Uttar Pradesh',
    'West Bengal'
  ];




    addresses: any = [];
    paymentMode: string = 'ONLINE'; // Default selected payment method
    resell: boolean = false;

    showOnlineButton:any = 'ONLINE'; //Default Selecter ONLINE
    showCodButton:any;
    

    
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

    constructor(private addressService: AddressService,
      private toast: NgToastService,
      private spinner: NgxSpinnerService,
      public cartService:AddToCartService,
      private tokenStorageService:TokenStorageService,
      private razorpayService: RazorpayService,
      private router:Router,
    ) {}

    ngOnInit(): void {
      console.log(this.cartService.getCartLength());
      
     if(this.cartService.getCartLength() <= 0)
     {
      this.toast.success({detail: "Success", summary: "Please Add Some Items to cart !! ", position: "bottomRight", duration: 2000});
      this.router.navigateByUrl('/home');
     }

      this.getAddress();
    }
  
  

  // ===========Model Open Close [Update Data Model, COD Model to show Order Processed Success ]===========
  modal: any;
  successModel:any;
  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('myModal'));
    this.successModel = new bootstrap.Modal(document.getElementById('successModal'));
  }
  closeModal() {
    this.modal.hide();
  }
  closeSuccessModel(){
    this.successModel.hide();
  }

  //GET ADDRESS=============================================================
  async getAddress() {
    this.spinner.show();
    this.addressService.getAddressList().subscribe({
      next: (res: any) => {
        this.addresses = res.data;

        //Sort Address
        this.sortAddresses();
        
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
        this.toast.error({detail: "Error", summary: "Something went wrong", position: "bottomRight", duration: 2000});
        this.spinner.hide();
      }
    });
  }    

  //SORT ADDRESS=================================================================
  sortAddresses() {
    this.addresses = this.addresses.sort((a:any, b:any) => Number(b.defaultAddress) - Number(a.defaultAddress));
  }

  //SET DEFAULT ADDRESS======================================================
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


   //GET ADDRESS BY ID=======================================================
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


  
  //UPDATE ADDRESS=============================================
  saveUpdateAddress() {
    this.spinner.show();

    console.log(this.updateAddressForm);
    
    this.addressService.updateAddress(this.updateAddressForm).subscribe({
      next: (res: any) => {
        console.log('Address update successfully:', res);

        this.toast.success({detail: "Success", summary: "Address Updated", position: "bottomRight", duration: 2000});
        this.spinner.hide();

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

//============SELECTED ADDRESS===============
selectedAddressIndex: number | null = null;
addressHolder:any = ""
onAddressSelect(address: any) {
  this.addressHolder  = address;
  console.log("AddressHolder");
  
  console.log(this.addressHolder);
  
}

  nextStep(stepper: MatStepper) {

    if(this.addressHolder ==="" || this.addressHolder === null || this.addressHolder === undefined){
      this.toast.warning({detail: "Success", summary: "Please select a delivery address before proceeding.",
      position: "bottomRight", duration: 3000});
      return;
    }

    if (this.selectedAddressIndex !== null && this.selectedAddressIndex !== undefined) {
      stepper.next();
    } else {
       this.toast.success({detail:"Success",summary:"Please select a delivery address before proceeding.",
                         position:"bottomRight",duration:3000});

    }
  }
  
  prevStep(stepper: MatStepper) {
    stepper.previous();
  }
  
  complete() {
    alert('Stepper completed!');
  }


 //Selected Paymenod Mode 
selectPayment(method: string) {
  this.paymentMode = method;
  if(this.paymentMode  === 'COD'){
    this.showCodButton = true;
    this.showOnlineButton = false;
  }else if(this.paymentMode === 'ONLINE'){
    this.showOnlineButton = true;
    this.showCodButton = false;
  }
}


//==========================================================
// ===================PAYMENT STARTING======================

    payLoader:any = false;
     //Amount PAying ONLINE----
    //Razorpay Integration Working Starting
    razorpayKey = 'rzp_test_cFBctGmM8MII0E';
    amountPaying_Online(amount: any) {
      // Pay Loader Starting...
      this.payLoader = true;
    
      if (this.addressHolder === "" || this.addressHolder === null || this.addressHolder === undefined) {
        this.toast.warning({
          detail: "Warning",
          summary: "Please select a delivery address before proceeding.",
          position: "bottomRight",
          duration: 3000
        });
        this.payLoader = false;
        return;
      }
    
      const user = this.tokenStorageService.getUser();
      if (!user || Object.keys(user).length === 0) {
        console.log("User is null, undefined, or an empty object");
        this.router.navigateByUrl('/login');
        this.payLoader = false;
        return;
      }
    
      // Check isValid Cart items
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const addressId = this.addressHolder.id;
      console.log("Selected address ID:", addressId);
    
      this.razorpayService.createOrderPaymentService(amount, addressId, cart).subscribe({
        next: (res: any) => {
          this.payLoader = false;
          const parsedResponse = JSON.parse(res.data);
    
          const options = {
            key: this.razorpayKey,
            amount: parsedResponse.amount,
            currency: 'INR',
            name: 'Shoppers',
            description: 'Ecommerce Platform',
            order_id: parsedResponse.id,
            handler: (response: any) => {
              console.log('Payment Success:', response);
    
              // Update Payment to Database
              this.paymentUpdate(response, cart);
    
              // Clear Cart Items
              this.cartService.clearCart();
    
              // Redirect to home
              this.router.navigateByUrl('/home');
            },
            prefill: {
              name: 'Aman Saini',
              email: 'Aman@example.com',
              contact: '9818644154'
            },
            theme: {
              color: '#3399cc'
            },
            modal: {
              escape: false,
              backdropclose: false,
              ondismiss: () => {
                // console.log('Payment popup closed by user');
                // alert('Payment popup closed before completing the transaction.');

                this.toast.error({
                  detail: "Payment Error",
                  summary: "Cancle to initiate payment. Please try again.",
                  position: "topRight",
                  duration: 2000
                });

              }
            }
          };
    
          const rzp = new Razorpay(options);
          rzp.open();
        },
        error: (err: any) => {
          this.payLoader = false;
          this.toast.error({
            detail: "Payment Error",
            summary: "Please try again | Something Went Wrong",
            position: "bottomRight",
            duration: 2000
          });
        }
      });
    }
    
  
    paymentUpdate(paymentTransaction:any ,cart:any) {
  
      paymentTransaction.cartItems = cart; // Add cart to the paymentTransaction object
      console.log(paymentTransaction); // Check the updated object before sending
  
      this.razorpayService.paymentTransaction(paymentTransaction).subscribe(
        (data) => {

          //Redirect to success page
          this.router.navigateByUrl('/pay/orderPlacedSuccess');

        },
        (err) => {
          alert('Registeration Failed');
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    }




  // ==========================PAYMENT COD STARTING =========================
  amountPaying_Cod(amount: any){
    // Pay Loader Starting...
    this.payLoader = true;

    if(this.addressHolder ==="" || this.addressHolder === null || this.addressHolder === undefined){
      this.toast.warning({detail: "Success", summary: "Please select a delivery address before proceeding.",
      position: "bottomRight", duration: 3000});
      return;
    }

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log("User is null, undefined, or an empty object");
      this.router.navigateByUrl('/login');
      return;
    }

    //Check isValid Cart items
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log(cart); // Check if cart is correctly retrieved
    const addressId = this.addressHolder.id;
    console.log(addressId);

    this.razorpayService.codOrderPaymentService(amount ,addressId, cart ).subscribe({
      next: (res: any) => {

        //Show COD MODEL
        this.successModel.show();

        this.showSuccess = false; 
        // Wait for 6s, then show success message
        setTimeout(() => {
          this.showSuccess = true;
        }, 5000);

        //Clear Cart Items
        this.cartService.clearCart();

         // Pay Loader Starting...
        this.payLoader = false;

      },error: (err: any) => {
        console.error('Error Creating COD Order:', err);
        this.toast.error({detail: "Error", summary: "Error Creating COD Order:", position: "bottomRight", duration: 2000});
        this.spinner.hide();
        
         // Pay Loader Starting...
         this.payLoader = false;
      }
      });
  }

  // ==============PAYMENT COD ENDING======================

//====================PAYMENT ENDING=======================




    //COD MODEL SHOW TO SHOW SUCCESS ORDER CREATION SATRTING
    showSuccess = false; // Initially, success message is hidden

    startAnimation() {
      this.showSuccess = false; // Reset success message
  
      // Wait for 6s, then show success message
      setTimeout(() => {
        this.showSuccess = true;
      }, 4000);
    }
     //COD MODEL SHOW TO SHOW SUCCESS ORDER CREATION SATRTING


}
