import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductWatchingService } from '../../../_services/productsService/productWatchigService/product-watching.service';
import { AddToCartService } from '../../../_services/addToCartService/add-to-cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-watching',
  templateUrl: './product-watching.component.html',
  styleUrl: './product-watching.component.css',
})
export class ProductWatchingComponent {
  // Main Object
  productData: any;
  similarProducts: any;

  // Param Collectors
  productId: any;
  productName: any;
  size: any;
  selectedSize: string | null = null;
  productInventory:any;
  isOutOfStock: boolean = false; // Track stock status
  
  mainImage: string = '../../../../assets/images/wear.jpg'; // Default main image

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private pwService: ProductWatchingService,
    public cartService: AddToCartService,
    private toast: NgToastService,
    
  ) {}

  ngOnInit() {

    //When is Page Loaded then selectedSize to make empty or null 
    this.selectedSize = '';

    this.route.queryParams.subscribe((params) => {
      this.productId = params['pI'];
      this.productName = params['pN'];
      this.size = params['size'];

      if (this.size !== null || this.size === undefined || this.size === '') {
        this.getProductWatching(this.productId, this.productName);
      } else {
      }
    });
  }

  //GET Product Search By Category Starting
  async getProductWatching(pI: any, pN: any) {
    this.spinner.show();
    this.pwService.productWatchingService(pI, pN).subscribe({
      next: (res: any) => {
        console.log("---------------------------------");
        
        console.log(res);

        this.productData = res.data.pw;
        //Set Image
        this.mainImage = res.data.pw.productFilesResponses[0].fileUrl;

        this.similarProducts = res.data.similarProducts.content;

        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }
  //GET Product Search By Category ENDING

  //Change main Image
  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }

  

  selectSize(size: string) {
    this.spinner.show();
    this.selectedSize = size;
  
    setTimeout(() => {
      const variant = this.productData.sellerProductVarientResponses.find(
        (variant: any) => variant.productLabel === size
      );
  
      if (variant) {
        // Update product details
        this.productData.productPrice = variant.productPrice;
        this.productData.productMrp = variant.productMrp;
        this.productData.calculatedDiscount = variant.calculatedDiscount;
        this.productInventory = variant.productInventory;
  
        // Check if product is out of stock
        this.isOutOfStock = variant.productInventory <= 0;

        console.log("OUT OF STOKE " , this.isOutOfStock);
        
        this.spinner.hide();
      }
    }, 0); // 1 seconds delay
  }
  



  outOfStockRollback(){
    this.isOutOfStock =false;
    this.selectedSize = "";
    this.cartService.selectedSize ="";
  }
  


  addToCartBuyNow(productData: any): void {

    if(this.selectedSize === '')
    {
      this.toast.warning({
        detail: 'Hey,',
        summary: 'Please Select Size.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }

    this.cartService.buyNow(productData);

  }


  cartAddToCart(productData: any): void{

    if(this.selectedSize === '')
      {
        this.toast.warning({
          detail: 'Hey,',
          summary: 'Please Select Size.',
          position: 'topRight',
          duration: 2000,
        });
        return;
      }
  
      this.cartService.addToCart(productData);
  }





 
  
}
