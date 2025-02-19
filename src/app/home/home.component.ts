import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductCategoryService } from '../_services/categoriesService/product-category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;

  categories: any;

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
        this.categories = res.data;

        console.log(this.categories);

        this.spinner.hide();
      },
      error: (err: any) => {
        console.log('Error Aleert');

        console.log(err);
        this.spinner.hide();
      },
    });
  }
}
