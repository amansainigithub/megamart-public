import { Component, HostListener } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddToCartService } from './_services/addToCartService/add-to-cart.service';
import { NavigationEnd, Router } from '@angular/router';

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
  homePageFlag:any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public cartService: AddToCartService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || this.router.url;
        if ( currentUrl.includes('customer') 
            || currentUrl === '/customer/dashboard' 
            || currentUrl === '/customer/orders-history' 
            || currentUrl === '/customer/manageAddress'
            || currentUrl === '/customer/orders-details'
        ) {
          this.homePageFlag = true;
        } else {
          this.homePageFlag = false;
        }
          } });
  
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
  this.homePageFlag =true;
  
  this.activeTab = tab;
  localStorage.setItem('activeTab', tab);
}

searchQuery: string = '';
        isDropdownOpen: boolean = false;
        products = [
            { name: "Laptop" },
            { name: "Smartphone" },
            { name: "Headphones" },
            { name: "Smartwatch" },
            { name: "Camera" },
            { name: "Tablet" },
            { name: "Bluetooth Speaker" },
            { name: "Gaming Console" }
        ];
        filteredResults:any = [];

        filterResults() {
            this.filteredResults = this.searchQuery.length > 0 ? this.products.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            ) : [];
            this.isDropdownOpen = this.filteredResults.length > 0;
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
}