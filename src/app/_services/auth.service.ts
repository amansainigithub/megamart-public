import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/customer/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string, userrole:string): Observable<any> {
    return this.http.post(AUTH_API + 'customerSignIn', {
      username,
      password,
      userrole
    }, httpOptions);
  }

  register(firstName:String,lastName:String, email: string, mobile: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'customerSignUp', {
      firstName,
      lastName,
      email,
      mobile,
      password
    }, httpOptions);
  }

  mobileOtpVerify(mobileOtpData:any){
    console.log(mobileOtpData)
    return this.http.post(AUTH_API+"verifyMobileOtp",mobileOtpData);
  }

  //Mobile is username of Customer to Login mobile ==> username
  saveFreshUser(username: string): Observable<any> {
    
    return this.http.post(AUTH_API + 'saveFreshUser', {
      username
    }, httpOptions);
  }


  verifyMobileOtp(verifyOtpForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'verifyFreshUserMobileOtp', verifyOtpForm);
  }




}
