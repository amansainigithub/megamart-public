import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductCategoryService } from '../_services/categoriesService/product-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  categories: any;
  homeSliderData: any;
  babyDataFilter: any;
  mensList:any;
  productsList:any;
  womenList:any;
  
  
  // Own Slider PROPERTIES
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    autoplay: true, // Enables autoplay
    autoplayTimeout: 10000, // Duration in milliseconds (5 seconds)
    autoplayHoverPause: true, // Pause on hover
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
}


  constructor(
    private userService: UserService,
    private productCategory: ProductCategoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProductCategory();
  }

  getProductCategory() {
    this.spinner.show();
    this.productCategory.getProductCategory().subscribe({
      next: (res: any) => {
        //Categories Data
        this.categories = res.data.listOfCategories;

        //Home Slider Data
        this.homeSliderData = res.data.homeSliderData;

        //Baby Category Data
        this.babyDataFilter = res.data.babyDataFilter;

         //Mens List
         this.mensList = res.data.mensList;

         //ProductLists
         this.productsList = res.data.productsList;

        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }





}
