import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/customer/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductWatchingService {

  constructor(private http:HttpClient) { }

  productWatchingService(cI:any , cN:any , pI:any , pN:any): Observable<any> {
        return this.http.get(API_URL + "/categoryController/" + 'productWatching?cI='+ cI + '&cN='+cN + '&pI='+pI + '&pN='+pN, httpOptions);
      }
}
