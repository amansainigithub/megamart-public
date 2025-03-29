import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductSService } from '../../../_services/productsService/productSService/product-s.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-s',
  templateUrl: './product-s.component.html',
  styleUrl: './product-s.component.css'
})
export class ProductSComponent {

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ps:ProductSService,
    private toast:NgToastService ,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cI = params['cI'];
      const cN = params['cN'];
      const sQNext = params['sQNext'];

      if(sQNext !==null || sQNext !== "" || sQNext !== undefined){
        if(sQNext === 'NO'){
            this.getProductS(cI , cN ,{page:"0",size:"50"});
        }else if(sQNext === 'YES'){
          this.getProductByBornCategoryId(cI , cN ,{page:"0",size:"50"});
        }else if(sQNext === 'DEAL'){
          this.getProductListDeal99(cI , cN ,{page:"0",size:"50"});
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
          this.productData = res.data['content']
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




  //DEAL 99 STARTING
getProductListDeal99(cI:any , cN:any , request:any)
   {
     this.spinner.show();
     this.ps.getProductListDeal99Service(cI,cN ,request)
     .subscribe(
       {
           next:(res:any)=> {
           this.productData = res.data['content']
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
    //DEAL 99 ENDING


}
