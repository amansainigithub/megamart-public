import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelperService } from '../_helpers/snackBar_Service/snack-bar-helper.service';

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

  constructor(private authService: AuthService,private router:Router,private _snackBarHelper: SnackBarHelperService) { }

  ngOnInit(): void {
  }


FreshUserform: any = {
  mobile: null
};

onSubmitFreshUser()
{

  //Mobile Number Validator
  if (/^\d{10}$/.test(this.FreshUserform.mobile)) {
    this._snackBarHelper.normalSnackBar('Valid Mobile Number', 'cancle',2000);
    } else {
      this._snackBarHelper
      .OpenSnackbar_verticalPosition_top_right('Invalid Mobile NUmber! Please Enter Ten Digit Mobile No.', 'cancle',3000);
      return;
    }


    const {mobile} = this.FreshUserform;
    this.authService.registerFreshUser(mobile).subscribe(
      data => {

        //console.log(data.message);

        if(data.message == "FLY_LOGIN_PAGE"){
          this._snackBarHelper.normalSnackBar('User Already Registered ! Please Login', 'cancle',2000);
          this.router.navigateByUrl('/login');
          return;
        }else{
          this.mobileOtpForm = true;
          this.registerForm = false;
          this._snackBarHelper.normalSnackBar('OTP Sent Success', 'cancle',2000);
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
      this._snackBarHelper.normalSnackBar("OTP Verified Success","Undo",2000);
      
      this.router.navigateByUrl('/passwordSetup',{ state: { username: this.verifyOtpForm.username  } });
    },
    err => {
      this._snackBarHelper.normalSnackBar("please Enter Correct OTP", 'cancle',2000);
    }
  );

}





}
