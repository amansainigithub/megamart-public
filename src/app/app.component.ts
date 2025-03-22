import { Component } from '@angular/core';
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
        if (currentUrl === '/customer/dashboard' 
          || currentUrl === '/customer/ordersCustomer' 
          || currentUrl === '/customer/manageAddress'
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


}