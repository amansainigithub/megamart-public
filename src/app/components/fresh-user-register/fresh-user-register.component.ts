import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import Swal from 'sweetalert2';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-fresh-user-register',
  templateUrl: './fresh-user-register.component.html',
  styleUrl: './fresh-user-register.component.css',
})
export class FreshUserRegisterComponent {
  regForm: any = {
    firstName:null,
    lastName:null,
    email:null,
    password: null,
    conformpassword: null,
  };

  receivedData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _SHS: SnackBarHelperService,
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

    console.log("================");
    
    console.log(this.regForm);
    this.authService.registerUser(this.regForm).subscribe(
      (data) => {
        Swal.fire({
          title: 'Congratulations',
          text: 'Registration Completed Success',
          icon: 'success',
        });
        this.router.navigateByUrl('/login');
      },
      (err) => {
        alert('Registeration Failed');
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
}
