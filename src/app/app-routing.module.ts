import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CustomerGuardService } from './customerGuard/customer-guard.service';
import { TempPageComponent } from './temp-page/temp-page.component';
import { FreshUserRegisterComponent } from './components/fresh-user-register/fresh-user-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductSComponent } from './components/products/product-s/product-s.component';
import { ProductWatchingComponent } from './components/products/product-watching/product-watching.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: '', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'user', component: BoardUserComponent },
{ path: 'mod', component: BoardModeratorComponent },
{ path: 'admin', component: BoardAdminComponent },
{ path: 'passwordSetup', component: FreshUserRegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },

{path: 'Search',component:ProductSComponent},
{path: 'pw',component:ProductWatchingComponent},

{
  path: 'customer',canActivate:[CustomerGuardService] ,
      children: [
                  //(Customer Panel)
                  { path: 'shopper', component: HomeComponent},
                ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,  RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
