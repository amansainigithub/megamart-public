import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as CryptoJS from 'crypto-js';

const AUTH_API = 'http://localhost:8080/customer/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }



  // register(firstName:String,lastName:String, email: string, mobile: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'customerSignUp', {
  //     firstName,
  //     lastName,
  //     email,
  //     mobile,
  //     password
  //   }, httpOptions);
  // }

  // ===================/=

  login(username: string, password: string, userrole:string): Observable<any> {
    return this.http.post(AUTH_API + 'customerSignIn', {
      username,
      password,
      userrole
    }, httpOptions);
  }

  registerFreshUser(username: string): Observable<any> {
    
    return this.http.post(AUTH_API + 'customerSignUp', {
      username
    }, httpOptions);
  }

  verifyMobileOtp(verifyOtpForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'verifyFreshUserMobileOtp', verifyOtpForm);
  }


  registerUser(registerForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'customerSignUpCompleted', registerForm);
  }

  forgotPassowrd(forgotpassword: any): Observable<any> {
    return this.http.post(AUTH_API + 'customerForgotPassword', forgotpassword);
  }

  
  forgotPassowrdFinal(forgotpasswordfinal: any): Observable<any> {
    return this.http.post(AUTH_API + 'customerForgotPasswordFinal', forgotpasswordfinal);
  }


  
  // ===========AES ALGORITHM========/=

  private apiUrl = 'http://localhost:8080/api/data'; // Adjust URL as needed
  private secretKey = CryptoJS.enc.Utf8.parse('1234567890008iu7yhygtfredfvgbhgg'); // 32 char secret key for AES-256


  encryptData(data: any): string {
    const jsonData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonData, this.secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encrypted;
  }

  sendDataCall(data: any): Observable<any> {
    const encryptedData = this.encryptData(data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(AUTH_API + 'sswordFinal', { data: encryptedData }, { headers });
  }


}
