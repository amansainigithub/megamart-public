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
export class AddressService {

  constructor(private http:HttpClient) { }

    saveAddress(address:any): Observable<any> {
          return this.http.post(PUBLIC_API_URL + "addressController/" + 'saveAddress', address, httpOptions);
        }

   getAddressList(): Observable<any> {
        return this.http.get(PUBLIC_API_URL + "addressController/" + 'getAddress', httpOptions);
   }
}
