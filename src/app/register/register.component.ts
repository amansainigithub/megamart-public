import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelperService } from '../_helpers/snackBar_Service/snack-bar-helper.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //OTP FORM
  mobileOtpForm:Boolean = false;

  //RegisterationForm
  registerForm:Boolean = true;

  constructor(
    private authService: AuthService,
    private router:Router,
    private _snackBarHelper: SnackBarHelperService,
    private toast:NgToastService,
    private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
   var node =  this.tokenStorageService.getUser();
   if(JSON.stringify(node) != '{}'){
    window.location.href = '/home';
   }
  }


FreshUserform: any = {
  mobile: null
};

onSubmitFreshUser()
{
  //Mobile Number Validator
  if (/^\d{10}$/.test(this.FreshUserform.mobile)) 
    {
        console.log('Valid Mobile Number');
    } 
    else 
    {
      this._snackBarHelper
      .OpenSnackbar_verticalPosition_top_right('Invalid Mobile NUmber! Please Enter Ten Digit Mobile No.', 'cancle',3000);
      return;
    }


    const {mobile} = this.FreshUserform;
    this.authService.registerFreshUser(mobile).subscribe(
      data => {
        if(data.message == "FLY_LOGIN_PAGE"){
          this.toast.error({detail:"Error",summary:"User Already Registered", position:"topRight",duration:3000})
          this.router.navigateByUrl('/login');
          return;
        }else{
          this.mobileOtpForm = true;
          this.registerForm = false;
          // this._snackBarHelper.normalSnackBar('OTP Sent Success', 'cancle',2000);
          this.toast.success({detail:"Success",summary:"OTP Sent Success", position:"topRight",duration:3000})
        }
      },
      err => {
        console.log(err);
        this._snackBarHelper.normalSnackBar(err.error.message, 'cancle',2000);
      }
    );

}

verifyOtpForm: any = {
  mobileOtp: null,
  username:null
};

verifyMobileOtp(){

  this.verifyOtpForm.username = this.FreshUserform.mobile;
  this.authService.verifyMobileOtp(this.verifyOtpForm).subscribe(
    data => {
      console.log(data);
      // this._snackBarHelper.normalSnackBar("OTP Verified Success","Undo",2000);
      this.toast.success({detail:"Success",summary:"OTP Verified Success", position:"topRight",duration:3000})
      this.router.navigateByUrl('/passwordSetup',{ state: { username: this.verifyOtpForm.username  } });
    },
    err => {
      // this._snackBarHelper.normalSnackBar("please Enter Correct OTP", 'cancle',2000);
      this.toast.info({detail:"Error",summary:"please Enter Correct OTP", position:"topRight",duration:3000});
    }
  );

}





}
