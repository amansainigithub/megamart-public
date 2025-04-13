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


  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ps:ProductSService,
    private toast:NgToastService ,
  ) {}

  categoryId:any;
  categoryName:any;
  sequenceQueryNext:any;
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

  productData:any;
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



   //GET Product Search By Born Category Starting
   getProductByBornCategoryId(cI:any , cN:any , request:any)
  {
    this.spinner.show();
    this.ps.getProductListByBornCategoryIdService(cI,cN ,request)
    .subscribe(
      {
          next:(res:any)=> {
          this.productData = res.data['content'];
          this.totalElements = res.data['totalElements'];

          console.log("Product Search Data Success By Born Category Id");
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


    readonly panelOpenState = signal(false);
    brandChecked = false;
    onBrandCheckboxChange(brand:any , event: any) {
      console.log('Checkbox checked:', event.checked);
      console.log('Brand selected:', this.brandChecked);
      console.log(brand);
    }

}
