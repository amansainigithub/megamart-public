import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import Swal from 'sweetalert2';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fresh-user-register',
  templateUrl: './fresh-user-register.component.html',
  styleUrl: './fresh-user-register.component.css',
})
export class FreshUserRegisterComponent {
  regForm: any = {
    firstName:null,
    lastName:null,
    gender:'',
    email:null,
    password: null,
    conformpassword: null,
  };

  receivedData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private tokenStorageService: TokenStorageService
  ) {
    const state = history.state;
    if (
      state.username == 'undefined' ||
      state.username == null ||
      state.username == '' ||
      state.username == 'null' ||
      state.username == undefined
    ) {
      this.router.navigateByUrl('/register');
    }
    this.regForm.username = state.username;
  }

  ngOnInit() {
    var node =  this.tokenStorageService.getUser();
   if(JSON.stringify(node) != '{}'){
    window.location.href = '/home';
   }
  }

  createAccount() {
    this.spinner.show();
    this.authService.registerUser(this.regForm).subscribe(
      (data) => {
        Swal.fire({
          title: 'Congratulations',
          text: 'Registration Completed Success',
          icon: 'success',
        });
        this.router.navigateByUrl('/login');
         this.spinner.hide();
      },
      (err) => {
        if(err.error.message === "EMAILID_ALREADY_EXISTS"){
          Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registeration Failed | Email ID already exists.",
          footer: 'Email ID already exists.'
        });
        this.spinner.hide();
        return;
        }
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registeration Failed",
          footer: 'Please Try after some Time.'
        });
         this.spinner.hide();
      }
    );
  }
}
