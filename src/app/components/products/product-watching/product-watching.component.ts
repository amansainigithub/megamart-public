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


  constructor(private route: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private pwService:ProductWatchingService,
      private toast:NgToastService ,
    ) {}
  
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        const cI = params['cI'];
        const cN = params['cN'];
        const pI = params['pI'];
        const pN = params['pN'];
        console.log('categoryId:', cI); 
        console.log('categoryName:', cN);
        console.log('productId:', pI); 
        console.log('productname:', pN);
      
        this.getProductWatching(cI,cN,pI,pN);
      });
    }
  

    mainImage: string = '../../../../assets/images/wear.jpg'; // Default main image
  thumbnails: string[] = [
    '../../../../assets/images/wear.jpg',
    '../../../../assets/images/wear2.jpg',
    '../../../../assets/images/wear3.png',
    '../../../../assets/images/wear4.png'
  ];

  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }

  //GET Product Search By Category Starting
  getProductWatching(cI:any , cN:any, pI:any , pN:any)
 {
   this.spinner.show();
   this.pwService.productWatchingService(cI,cN,pI,pN)
   .subscribe(
     {
         next:(res:any)=> {
         this.productData = res.data;
         console.log("Product Search Data");
         console.log(this.productData);
         
         // this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
         this.spinner.hide();
       },
       error:(err:any)=>  {
         console.log(err)
         this.spinner.hide();
         // this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
       }
     }
   );
 }
    //GET Product Search By Category ENDING
  

}
