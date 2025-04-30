import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CustomerGuardService } from './customerGuard/customer-guard.service';
import { FreshUserRegisterComponent } from './components/fresh-user-register/fresh-user-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductSComponent } from './components/products/product-s/product-s.component';
import { ProductWatchingComponent } from './components/products/product-watching/product-watching.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { ProceedToPayComponent } from './components/proceed-to-pay/proceed-to-pay.component';
import { OrderPlacedSuccessComponent } from './components/order-placed-success/order-placed-success.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { TermsAndConditionComponent } from './components/legalAndPolicies/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './components/legalAndPolicies/privacy-policy/privacy-policy.component';
import { ReturnProductComponent } from './components/return-exchange-products/return-product/return-product.component';
import { ExchangeProductComponent } from './components/return-exchange-products/exchange-product/exchange-product.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'passwordSetup', component: FreshUserRegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'Search',component:ProductSComponent},
{ path: 'pw',component:ProductWatchingComponent},
{ path: 'cart',component:AddToCartComponent},

{
  path: 'customer',canActivate:[CustomerGuardService] ,
      children: [
                  // Customer Panel
                  { path: 'shopper', component: HomeComponent},
                  { path: 'dashboard', component: DashboardComponent},
                  { path: 'orders', component: CustomerOrdersComponent},
                  { path: 'my-orders', component: MyOrdersComponent},
                  { path: 'orders-details/:id', component: OrderDetailsComponent },
                  { path: 'manageAddress', component: ManageAddressComponent},
                  { path: 'profile', component: ProfileComponent},
                  { path: 'reviews', component: ReviewsComponent},
                  { path: 'terms-and-conditions', component: TermsAndConditionComponent},
                  { path: 'privacy-policy', component: PrivacyPolicyComponent},
                  { path: 'returnProduct', component: ReturnProductComponent},
                  { path: 'exchangeProduct', component: ExchangeProductComponent}
                ],
},

{
  path: 'pay',canActivate:[CustomerGuardService] ,
      children: [
                  { path: 'proceedToPay', component: ProceedToPayComponent},
                  { path: 'orderPlacedSuccess', component: OrderPlacedSuccessComponent},
                 
                ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,  RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
