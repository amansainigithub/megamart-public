import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PUBLIC_API_URL } from '../../URL/ApiUrls';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  
    getProfile(id:any): Observable<any> {
          return this.http.get(PUBLIC_API_URL + "profileController/" + 'getProfile/'+id, httpOptions);
     }

     updateCustomerProfile(updateProfile: any): Observable<any> {
      return this.http.post(PUBLIC_API_URL +  "profileController/" + 'updateCustomerProfile', updateProfile);
    }

    resendEmailLink(id:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "profileController/" + 'resendEmailLink/'+id, httpOptions);
 }

}
