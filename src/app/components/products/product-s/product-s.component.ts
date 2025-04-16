import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductSService } from '../../../_services/productsService/productSService/product-s.service';
import { NgToastService } from 'ng-angular-popup';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-s',
  templateUrl: './product-s.component.html',
  styleUrl: './product-s.component.css'
})
export class ProductSComponent {

  request:any = {page:"0",size:"100"};
  totalElements: number = 0;

  categoryId:any;
  categoryName:any;
  sequenceQueryNext:any;

  //Data to Fetch
  productData:any;

  //make Brand List
  brandList:any =[];

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ps:ProductSService,
    private toast:NgToastService ,
  ) {}

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId =  params['cI'];
      this.categoryName =  params['cN'];
      this.sequenceQueryNext = params['sQNext'];

      const cI = params['cI'];
      const cN = params['cN'];
      const sQNext = params['sQNext'];

      if(sQNext !==null || sQNext !== "" || sQNext !== undefined){
        if(sQNext === 'NO'){
            this.getProductS(cI , cN ,this.request);
        }else if(sQNext === 'YES'){
          this.getProductByBornCategoryId(cI , cN ,this.request);
        }
      }
    });
  }

  
   //GET Product Search By Category Starting
   getProductS(cI:any , cN:any , request:any)
  {
    this.spinner.show();
    this.ps.getProductS(cI,cN ,request)
    .subscribe(
      {
          next:(res:any)=> {
          this.productData = res.data['content']
          this.totalElements = res.data['totalElements'];
          // console.log(this.productData);

          this.productData.forEach((item:any)=>{
           const exists =  this.brandList.some((existingItems:any)=> existingItems.brandName === item.brandField);
            if(!exists)
            {
              this.brandList.push({"brandName": item.brandField,"checked":false});
            }
          })
          // console.log(this.brandList);
          

          // this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err);
          this.spinner.hide();
          // this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        }
      }
    );
  }
     //GET Product Search By Category ENDING



   //GET Product Search By Born Category Starting
   getProductByBornCategoryId(cI:any , cN:any , request:any)
  {
    this.spinner.show();
    this.ps.getProductListByBornCategoryIdService(cI,cN ,request)
    .subscribe({
            next:(res:any)=> {
            this.productData = res.data['content'];
            this.totalElements = res.data['totalElements'];
            // this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
            this.spinner.hide();
          },
          error:(err:any)=>  {
            console.log(err);
            this.spinner.hide();
            // this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          }
        }
      );
  }
     //GET Product Search By Category ENDING


    nextPage(event: PageEvent) {
      console.log(event);
       const request: any = {};
       request['page'] = event.pageIndex.toString();
       request['size'] = event.pageSize.toString();
       if(this.sequenceQueryNext === 'NO'){
        this.getProductS(this.categoryId ,this.categoryName , request);
       }
       else if(this.sequenceQueryNext === 'YES'){
        this.getProductByBornCategoryId(this.categoryId ,this.categoryName , request);
       }
     } 



//  ==========================================================================================================
    readonly panelOpenState = signal(false);
    priceRange: string[] = ['0 to 199','199 to 299' ,'299 to 399','399 to 499','1000 to 6000'];

    // Filter Items Starting
    selectedBrands: string[] = [];

    //Gender Filter
    selectedGenders: string[] = [];

    //Selected Price
    selectedPrice:any;

    productFilterRequest:any = {
      brandKeys: null,
      genders: null,
      price: null
    };

    // Product Filter By Brands Starting
    toggleBrandSelection(brand: any) {
      if (brand.checked) {
        this.selectedBrands.push(brand.brandName);
      } else {
        this.selectedBrands = this.selectedBrands.filter(b => b !== brand.brandName);
      }

      //Put Array in the ProductFilter
      this.productFilterRequest.brandKeys = this.selectedBrands;

      console.log(this.selectedBrands);
      

      if(this.selectedBrands.length === 0 &&  this.selectedBrands.length === 0 ){
        this.getProductS(this.categoryId,this.categoryName,this.request);
        return;
      }else if(this.productFilterRequest.brandKeys.length > 0){
        this.productFilters(this.productFilterRequest);
      }
    }
  // Product Filter By Brands Ending


  // Product Filter By Gender Starting
    genderSelected(){
      //Put Array in the ProductFilter
      this.productFilterRequest.genders = this.selectedGenders;
      this.productFilterRequest.brandKeys = this.selectedBrands;

      if(this.productFilterRequest.brandKeys.length === 0 && 
         this.productFilterRequest.genders.length === 0)
      {
        this.getProductS(this.categoryId,this.categoryName,this.request);
        return;
      }else{
        this.productFilters(this.productFilterRequest);
      }
    }
  // Product Filter By Gender Ending..




//   // Product Filter By Price Starting
//   priceSelected(){
//     //Put Array in the ProductFilter
//    this.productFilterRequest.price = this.selectedPrice;
//   //  this.productFilters(this.productFilterRequest);
//  }
// // Product Filter By Price Ending..


    // Filter Items API's Starting
  productFilters(productFilterRequest:any){
        this.ps.productFilter(productFilterRequest,this.request)
        .subscribe({
                next:(res:any)=> {
                // console.log(res);
                this.productData = res.data['content'];
                this.totalElements = res.data['totalElements'];
                this.spinner.hide();
              },
              error:(err:any)=>{
                console.log(err);
                this.spinner.hide();
              }
            });
      }
    // Filter Items API's Ending....    



    clearAll() {
      // Clear selection arrays
      this.selectedBrands = [];
    
      // Reset filter request object
      this.productFilterRequest = {
        brandKeys: null,
        genders: null,
        price: null
      };
    
      // Uncheck all brand checkboxes
      this.brandList.forEach((brand:any) => brand.checked = false);
    
      // Optionally close filter panel
      this.panelOpenState.set(false);
    
      // Fetch all products again
      this.getProductS(this.categoryId, this.categoryName, this.request);
    }
    
      
 
}
