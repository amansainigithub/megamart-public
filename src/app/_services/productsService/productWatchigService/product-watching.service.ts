import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PUBLIC_API_URL } from '../../../URL/ApiUrls';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductWatchingService {

  constructor(private http:HttpClient) { }

  productWatchingService(pI:any , pN:any): Observable<any> {
        return this.http.get(PUBLIC_API_URL + "categoryController/" + 'productWatching?cI='+'&pI='+pI + '&pN='+pN, httpOptions);
      }

  productWatchingWithSizeService(pI:any ,pl:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "categoryController/" + 
                          'productWatchingWithSize?pI='+pI + '&pl='+pl, httpOptions);
  }

  getProductByIdCustomer(pI:any , pN:any): Observable<any> {
    return this.http.get(PUBLIC_API_URL + "categoryController/" + 'getProductByIdCustomer?cI='+'&pI='+pI + '&pN='+pN, httpOptions);
  }
}
