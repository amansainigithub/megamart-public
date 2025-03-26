import { Component } from '@angular/core';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import { AuthService } from '../../_services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private _SSH:SnackBarHelperService ,
     private authService:AuthService , 
     private router:Router ,
      private toast:NgToastService){

  }
  response:any;
  
  form: any = {
    username: null,
    password: null,
    conformPassword : null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  forgotPassworduserValidate(){
  if(this.form.password != this.form.conformPassword){
    this.toast.info({detail:"Password and conformPassword not match",summary:"", position:"topRight",duration:3000});
      return;
  }
    if(this.form.password == this.form.conformPassword && this.form.username != null){

      this.authService.forgotPassowrd(this.form).subscribe(
        data => {
          console.log(JSON.stringify(data))
          
          if(data.message == "VALID_OTP-FORM-OPEN" && data.status == "OK"){

            //Show model to update OTP Password
            document.getElementById('myModal')!.style.display = 'block';

            this.response = data.message ;

          }else{
            this.toast.error({detail:"Please Enter a Valid mobile number",summary:"Error", position:"topRight",duration:3000});
          }
        },
        err => {
          this.toast.error({detail:"Please Enter a Correct OTP",summary:"Error", position:"topRight",duration:3000});
        }
      );

    }
  }



    forgotPasswordForm: any = {
      otp: null,
    };

    upadtePasswordFinal(){
      if(this.form.mobile !== null && this.form.password !== null && this.response == "VALID_OTP-FORM-OPEN")
      {
        this.forgotPasswordForm.username = this.form.username;
        this.forgotPasswordForm.password = this.form.password;
        this.forgotPasswordForm.conformPassword = this.form.conformPassword;

        this.authService.forgotPassowrdFinal(this.forgotPasswordForm).subscribe( data=>{
          //Show model to update OTP Password
          document.getElementById('myModal')!.style.display = 'none';
          
          Swal.fire({
            title: "Password reset",
            text: "Password Reset Success",
            icon: "success"
          });
          this.router.navigateByUrl("/login");
        },
        error=>{
          this.toast.error({detail:"Please Enter a Valid OTP!!",summary:"Error", position:"topRight",duration:3000});
        })

        
      }
    }
   
}
