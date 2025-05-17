import { Component, HostListener } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddToCartService } from './_services/addToCartService/add-to-cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { ProductSService } from './_services/productsService/productSService/product-s.service';

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

  constructor(
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public cartService: AddToCartService,
    public productSearch: ProductSService
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
          currentUrl === '/customer/orders-cancel'
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
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/';
  }

  genToast() {
    this.toast.success({
      detail: 'Success',
      summary: 'This is Success',
      position: 'topRight',
      duration: 3000,
    });
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
          console.log(res.data);
          this.filteredResults = this.searchQuery.length > 0 ? res.data : [];
          this.isDropdownOpen = this.filteredResults.length > 0;
          this.spinner.hide();
        },
        error: (err: any) => {
          console.error('REVIEWS not Captured Error !!:', err);
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

}
