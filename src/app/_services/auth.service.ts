import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { PUBLIC_API_URL } from '../URL/ApiUrls';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(username: string, password: string, userrole:string): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'customerSignIn', {
      username,
      password,
      userrole
    }, httpOptions);
  }

  registerFreshUser(username: string): Observable<any> {
    
    return this.http.post(PUBLIC_API_URL + 'customerSignUp', {
      username
    }, httpOptions);
  }

  verifyMobileOtp(verifyOtpForm: any): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'verifyFreshUserMobileOtp', verifyOtpForm);
  }


  registerUser(registerForm: any): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'customerSignUpCompleted', registerForm);
  }

  forgotPassowrd(forgotpassword: any): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'customerForgotPassword', forgotpassword);
  }

  
  forgotPassowrdFinal(forgotpasswordfinal: any): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'customerForgotPasswordFinal', forgotpasswordfinal);
  }
}
