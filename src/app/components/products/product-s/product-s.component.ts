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
          console.log(this.productData);

          this.productData.forEach((item:any)=>{
           const exists =  this.brandList.some((existingItems:any)=> existingItems.brandName === item.brandField);
            if(!exists)
            {
              this.brandList.push({"brandName": item.brandField,"checked":false});
            }
          })
          console.log(this.brandList);
          

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
    // Filter Items Starting
    selectedBrand: string[] = [];
    readonly panelOpenState = signal(false);

    //Gender Filter
    selectedGenders: string[] = [];
    
    onBrandCheckboxChange(brand: any, event: any) {
      this.spinner.show();
      if (event.checked === true) {
        if (!this.selectedBrand.includes(brand.brandName)) {
          this.selectedBrand.push(brand.brandName);
        }
      } else {
        this.selectedBrand = this.selectedBrand.filter(
          (existing: string) => existing !== brand.brandName
        );
      }
    
      //Check SelectedBrand Array is 0 then Normal Products Shows....
      if(this.selectedBrand.length === 0 && this.selectedGenders.length === 0)
      {
        this.getProductS(this.categoryId,this.categoryName,this.request);
        return;
      }
      
      console.log(this.selectedBrand);
      const productFilterRequest = {
        brandKeys: this.selectedBrand,
        genders:this.selectedGenders
      };
     

      //Call Filter API's
      this.productFilters(productFilterRequest);
    }

   

    //Gender Filter Starting 
    genderSelected(){
      const productFilterRequest = {
        brandKeys: this.selectedBrand,
        genders:this.selectedGenders
      };

      //Check SelectedBrand Array is 0 then Normal Products Shows....
      if(this.selectedGenders.length === 0 && this.selectedBrand.length !== 0){
        this.productFilters(productFilterRequest);
      }else if(this.selectedGenders.length !== 0){
        this.productFilters(productFilterRequest);
      }else{
        this.getProductS(this.categoryId,this.categoryName,this.request);
        return;
      }
    }
    //Gender Filter Ending--- 


    // Filter Items Ending
      productFilters(productFilterRequest:any){
        this.ps.productFilter(productFilterRequest,this.request)
        .subscribe({
                next:(res:any)=> {
                console.log(res);
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
 
}
