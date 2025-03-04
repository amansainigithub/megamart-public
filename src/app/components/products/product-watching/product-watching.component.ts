import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductSService } from '../../../_services/productsService/productSService/product-s.service';
import { NgToastService } from 'ng-angular-popup';
import { ProductWatchingService } from '../../../_services/productsService/productWatchigService/product-watching.service';

@Component({
  selector: 'app-product-watching',
  templateUrl: './product-watching.component.html',
  styleUrl: './product-watching.component.css'
})
export class ProductWatchingComponent {

  productData:any;
  similarProducts:any;
  productId:any;
  mainImage: string = '../../../../assets/images/wear.jpg'; // Default main image


  constructor(private route: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private pwService:ProductWatchingService,
      private toast:NgToastService ,
    ) {}
  
    ngOnInit() {

      this.loadCart()


      this.route.queryParams.subscribe(params => {
        this.productId = params['pI'];

        const cI = params['cI'];
        const cN = params['cN'];
        const pI = params['pI'];
        const pN = params['pN'];
      
        this.getProductWatching(cI,cN,pI,pN);
      });
    }
  
 
  //GET Product Search By Category Starting
  async getProductWatching(cI:any , cN:any, pI:any , pN:any)
 {
   this.spinner.show();
   this.pwService.productWatchingService(cI,cN,pI,pN)
   .subscribe(
     {
         next:(res:any)=> {
          
         this.productData = res.data.pw;
          //Set Image
          this.mainImage = res.data.pw.productFilesResponses[0].fileUrl;

         this.similarProducts = res.data.similarProducts.content;
        

         console.log("----------------------------------");
         console.log(res);
         console.log(this.productData);
         console.log(this.similarProducts);
         
         this.spinner.hide();
       },
       error:(err:any)=>  {
         console.log(err)
         this.spinner.hide();
       }
     }
   );
 }
    //GET Product Search By Category ENDING
 
//Change main Image    
changeMainImage(newImage: string) {
      this.mainImage = newImage;
    }
  



    selectedSize: string = '';

    onSizeChange(event: any) {
      this.selectedSize = event.target.value;
    }
    











  //Add To Cart Functionality Starting
  private cartItems: any[] = [];
  
  addToCart(productId: string, productName: string, productPrice: number, brandField: string): void {

    if(this.selectedSize === null || this.selectedSize === undefined || this.selectedSize === ''){
      alert("Please Select Size.");
      return;
    }

   const productSize = this.selectedSize;

    console.log(productId, productName, productPrice, brandField, productSize);

    const existingItem = this.cartItems.find(item => item.pId === productId && item.pSize === productSize);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.pPrice * existingItem.quantity; // Update total price
    } else {
        const cartItem = {
            pId: productId,
            pName: productName,
            pPrice: productPrice,
            pBrand: brandField,
            pSize: productSize,
            quantity: 1,
            totalPrice: productPrice
        };
        this.cartItems.push(cartItem);
    }

    this.saveCart();
    this.toast.success({detail:"Success",summary:"Item Added to Cart", position:"bottomRight",duration:2000});
}


  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Convert to string and store in localStorage
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart); // Convert back to array if found
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart'); // Clear localStorage
  }

  removeFromCart(productId: any, productSize: any) {
    this.cartItems = this.cartItems.filter(item => !(item.pId === productId && item.pSize === productSize));
    this.saveCart();
  }

  updateQuantity(productId: any, productSize: any, quantity: number) {
    const item = this.cartItems.find(item => item.pId === productId && item.pSize === productSize);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1; // Prevent quantity from going below 1
      item.totalPrice = item.pPrice * item.quantity; // Update total price
      this.saveCart();
    }
  }

  getCartTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }


}
