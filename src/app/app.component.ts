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
        if (
          currentUrl.includes('customer') ||
          currentUrl === '/customer/dashboard' ||
          currentUrl === '/customer/orders-history' ||
          currentUrl === '/customer/manageAddress' ||
          currentUrl === '/customer/orders-details' ||
          currentUrl === '/customer/my-orders' ||
          currentUrl === '/customer/reviews' ||
          currentUrl === '/customer/terms-and-conditions' ||
          currentUrl === '/customer/privacy-policy'
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

  selectProduct(name: string) {
    this.searchQuery = name;
    this.isDropdownOpen = false;
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
