import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {
    firstName: null,
    lastName: null,
    email: 'no@gmail.com',
    mobile: null,
    password: null,
    conformPassword: null
  };

  mobileOtpData: any = {
    mobileOtp: null,
  };


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //OTP FORM
  mobileOtpForm:Boolean = false;

  //RegisterationForm
  registerForm:Boolean = true;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
     this.mobileOtpForm = true;
     this.registerForm = false;
    const { firstName,lastName, email, mobile, password } = this.form;
    this.authService.register(firstName,lastName, email,mobile, password).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  mobileOtpPayload: any = {
    email: null,
    username: null,
    mobileOtp: null
  };


  otpSubmit(){
    this.mobileOtpPayload.mobile = this.form.mobile;

    this.authService.mobileOtpVerify(this.form).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
  )

}


FreshUserform: any = {
  mobile: null
};

onSubmitFreshUser()
{
  
  this.mobileOtpForm = true;
     this.registerForm = false;

    const {mobile} = this.FreshUserform;
    this.authService.saveFreshUser(mobile).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      },
      err => {
        alert(err)
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
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

      alert("OTP Verified Success");
      this.router.navigateByUrl('/passwordSetup',{ state: { example: 'AMAN SAINI' } });
      // window.location.href = '/passwordSetup';
      // this.isSuccessful = true;
      // this.isSignUpFailed = false;
    },
    err => {
      alert("OTP Verified Failed");
      // this.errorMessage = err.error.message;
      // this.isSignUpFailed = true;
    }
  );

}





}
