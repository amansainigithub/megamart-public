import { Component, HostListener } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddToCartService } from './_services/addToCartService/add-to-cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { ProductSService } from './_services/productsService/productSService/product-s.service';
import { HomeComponent } from './home/home.component';
import { ProductCategoryService } from './_services/categoriesService/product-category.service';

declare var bootstrap: any; // Import Bootstrap JavaScript


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'JET-ANGULAR-2';
  activeTab: string = '';
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  homePageFlag: any;

  //categories
  categories:any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public cartService: AddToCartService,
    public productSearch: ProductSService,
    public productService: ProductCategoryService,
  ) {}

  ngOnInit(): void {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || this.router.url;
       

        if(currentUrl === '/customer/orders'){
          this.setActiveTab(currentUrl);
        }

        if(currentUrl === '/customer/my-orders'){
          this.setActiveTab(currentUrl);
        }

        if (
          currentUrl.includes('customer') ||
          currentUrl === '/customer/dashboard' ||
          currentUrl === '/customer/orders-history' ||
          currentUrl === '/customer/manageAddress' ||
          currentUrl === '/customer/orders-details' ||
          currentUrl === '/customer/my-orders' ||
          currentUrl === '/customer/reviews' ||
          currentUrl === '/customer/terms-and-conditions' ||
          currentUrl === '/customer/privacy-policy' ||
          currentUrl === '/customer/orders-cancel' ||
          currentUrl === '/customer/contact-us'
        ) {
          this.homePageFlag = true;
        } else {
          this.homePageFlag = false;
        }
      }
    });

    this.activeTab = localStorage.getItem('activeTab') || '/customer/dashboard';

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.gender = user.gender;
    }

    // Load the Cart Items
    this.cartService.loadCart();


    //Get Footer Category
    this.getCategoriesFooter();
  }



  setActiveTab(tab: string) {
    this.homePageFlag = true;

    this.activeTab = tab;
    localStorage.setItem('activeTab', tab);
  }



//Searching Starting ==============================================================================
  searchQuery: string = '';
  isDropdownOpen: boolean = false;
  filteredResults: any = [];

  filterResults() {
    if (this.searchQuery.length > 3) {
      this.productSearch.productSearch(this.searchQuery).subscribe({
        next: (res: any) => {
          this.filteredResults = this.searchQuery.length > 0 ? res.data : [];
          this.isDropdownOpen = this.filteredResults.length > 0;
          this.spinner.hide();
        },
        error: (err: any) => {
          this.spinner.hide();
        },
      });
    }
  }

  selectProduct(cI: any , bornCategoryName:any) {
    this.isDropdownOpen = false;
    this.router.navigate(['/Search'], {
      queryParams: {
        cI: cI,
        cN: bornCategoryName,
        sQNext: 'YES',
      }
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredResults = [];
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.isDropdownOpen = false;
  }

//Searching ENDING !!! ==============================================================================


// FOOTER CATEGORY START
categoriesFooter:any;
  getCategoriesFooter() {
    this.spinner.show();
    this.productService.getCategoriesFooter().subscribe({
      next: (res: any) => {
        this.categoriesFooter = res.data;
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
      },
    });
  }
//FOOTER CATEGORY ENDING


  //Logout
  logout(): void {
    // this.openLogoutModel();
    // return;
    this.tokenStorageService.signOut();
    window.location.href = '/';
  }


    // model Properties Starting

  // logoutModel: any;
  // ngAfterViewInit() {
  //   this.logoutModel = new bootstrap.Modal(
  //     document.getElementById('logoutModel')
  //   );
  // }

  // openLogoutModel() {
  //   this.logoutModel.show();
  // }

  // closeLogoutModel() {
  //   this.logoutModel.hide();
  // }
  // model Properties Ending

}
