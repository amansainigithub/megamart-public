import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddToCartService } from './_services/addToCartService/add-to-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showFiller = false;
  title = 'JET-ANGULAR-2';
  activeTab: string = '';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public cartService: AddToCartService
  ) {}

  ngOnInit(): void {
    this.activeTab = localStorage.getItem('activeTab') || '/customer/dashboard';

    
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    //Load the Cart Items
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

  isHomePage(): boolean {
  const currentUrl = this.router.url;
  console.log(currentUrl);
  return currentUrl.startsWith('/customer');
}


setActiveTab(tab: string) {
  this.activeTab = tab;
  localStorage.setItem('activeTab', tab);
}


}