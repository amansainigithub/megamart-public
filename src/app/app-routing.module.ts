import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
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
                  { path: 'ordersCustomer', component: CustomerOrdersComponent},
                  { path: 'manageAddress', component: ManageAddressComponent},
                ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,  RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
