import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../_services/profileService/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profile:any;

  profileForm: any = {
    firstName:null,
    lastName:null,
    email:null,
    mobile:null,
    emailVerify:null,
    customerGender:null
  };

  profileUpdateForm: any = {
    firstName:null,
    lastName:null,
    email:null,
    emailVerify:null,
    id:null,
    customerGender:null
  };

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private _SHS: SnackBarHelperService,
      private token: TokenStorageService,
      private spinner: NgxSpinnerService,
      private profileService:ProfileService,
      private toast:NgToastService
    ) {
    }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    
    if(this.currentUser == null || this.currentUser == "")
    {
      this.router.navigateByUrl("/login");
    }else{
      this.profileUpdateForm.id = this.currentUser.id;
      this.getProfile(this.currentUser.id);
    }
  }

  updateProfile() {
  
      console.log("================");
      this.profileUpdateForm = this.profileForm;
      console.log(this.profileUpdateForm);
      this.profileService.updateCustomerProfile(this.profileUpdateForm).subscribe(
        {
          next: (res: any) => {
                  this.profileForm = res.data;
                  console.log(this.profileForm);
                  this.toast.success({detail: "Success", summary: "Profile Update Success", position: "bottomRight", duration: 2000});

                  this.getProfile(this.currentUser.id);
                  this.spinner.hide();
                  
              },
          error: (err: any) => {
            console.error('Profile Data Successfully Fetching:', err);
            this.toast.error({detail:"Please Enter a Correct OTP",summary:"Error", position:"topRight",duration:3000});

            this.spinner.hide();
          },
        }
      );
    }


   
  getProfile(id:any) {
      this.spinner.show();
      this.profileService.getProfile(id).subscribe({
              next: (res: any) => {
                this.profileForm = res.data;
                console.log(this.profileForm);
                this.spinner.hide();
            },
        error: (err: any) => {
          console.error('Profile Data Successfully Fetching:', err);
          this.spinner.hide();
        },
      });
    }



    resendLink(){

      this.spinner.show();
      this.profileService.resendEmailLink(this.currentUser.id).subscribe({
              next: (res: any) => {
                this.profileForm = res.data;
                console.log(this.profileForm);
                this.toast.success({detail: "Email Link Sent", summary: "Profile Update Success", position: "bottomRight", duration: 2000});


                this.getProfile(this.currentUser.id);
                this.spinner.hide();
            },
        error: (err: any) => {
          console.error('Link Not Sent', err);
          this.spinner.hide();
        },
      });

    }


}
