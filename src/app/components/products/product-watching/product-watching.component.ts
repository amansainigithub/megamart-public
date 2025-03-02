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
  mainImage: string = '../../../../assets/images/wear.jpg'; // Default main image


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
  
 
  //GET Product Search By Category Starting
  async getProductWatching(cI:any , cN:any, pI:any , pN:any)
 {
   this.spinner.show();
   this.pwService.productWatchingService(cI,cN,pI,pN)
   .subscribe(
     {
         next:(res:any)=> {
         this.productData = res.data;

         //Set Image
         this.mainImage = res.data.productFilesResponses[0].fileUrl;

         console.log("----------------------------------");
         console.log(this.productData);
         
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
  
}
