import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FreshUserRegisterComponent } from './components/fresh-user-register/fresh-user-register.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { ProductSComponent } from './components/products/product-s/product-s.component';
import { ProductWatchingComponent } from './components/products/product-watching/product-watching.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ProceedToPayComponent } from './components/proceed-to-pay/proceed-to-pay.component';
import { OrderPlacedSuccessComponent } from './components/order-placed-success/order-placed-success.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrderDetailsComponent } from './components/order-details/order-details.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    FreshUserRegisterComponent,
    ForgotPasswordComponent,
    ProductSComponent,
    ProductWatchingComponent,
    AddToCartComponent,
    DashboardComponent,
    CustomerOrdersComponent,
    ManageAddressComponent,
    ProceedToPayComponent,
    OrderPlacedSuccessComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    CarouselModule,
    RouterModule,
    MatBadgeModule,
    MatStepperModule,
    MatExpansionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
