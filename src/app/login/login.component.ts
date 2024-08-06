import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Validation from '../utils/Validation';
import { SnackBarHelperService } from '../_helpers/snackBar_Service/snack-bar-helper.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  form: any = {
    username: null,
    password: null,
    userrole: 'ROLE_CUSTOMER'
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  progressBarShow:any = false;

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService ,
    private _SSH:SnackBarHelperService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    //this.spinner.show();
    this.progressBarShow = true;
    const { username, password , userrole } = this.form;
    this.authService.login(username, password , userrole).subscribe(
      data => {
        console.log("LOGIN:: "  + data) 
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.spinner.hide();
        window.location.href = '/customer';
        //this.reloadPage();
      },
      err => {
        this._SSH.normalSnackBar('Invalid Username and Password', 'cancle',3000);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.spinner.hide();
        
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }







  // form = {
  //   fullname: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   acceptTerms: false,
  //   submitted:false
  // };

  // onSubmit(): void {
  //   console.log(JSON.stringify(this.form, null, 2));
  // }

  // onReset(form: NgForm): void {
  //   form.reset();
  // }
  





  

  














}
