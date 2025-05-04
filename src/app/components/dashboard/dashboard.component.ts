import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../_services/dashboardService/dashboard.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { AddToCartService } from '../../_services/addToCartService/add-to-cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dashboardData:any;

   constructor(private route: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private dashService:DashboardService,
      private tokenStorageService:TokenStorageService,
      public cartService: AddToCartService
    ) {}


    ngOnInit() {
      this.getDashboard();
    }

    getDashboard()
    {
      const username = this.tokenStorageService.getUser().username;

      this.spinner.show();
      this.dashService.getDashboard(username)
      .subscribe(
        {
            next:(res:any)=> {
            // console.log(res);
              
            this.dashboardData = res.data;
            this.spinner.hide();
          },
          error:(err:any)=>  {
            console.log(err)
            this.spinner.hide();
          }
        }
      );
    }
  
}
