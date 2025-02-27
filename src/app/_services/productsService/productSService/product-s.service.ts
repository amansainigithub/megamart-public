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
export class ProductSService {

    constructor(private http: HttpClient) { }
  
    getProductS(cI:any , cN:any ,request:any): Observable<any> {
      return this.http.get(API_URL + "/categoryController/" 
                    + 'getProductListByCategoryId?cI='+ cI + '&cN='+cN + '&page='+request.page + '&size=' +request.size, httpOptions);
    }

    getProductListByBornCategoryIdService(cI:any , cN:any ,request:any): Observable<any> {
      return this.http.get(API_URL + "/categoryController/" 
                    + 'getProductListByBornCategoryId?cI='+ cI + '&cN='+cN + '&page='+request.page + '&size=' +request.size, httpOptions);
    }

    getProductListDeal99Service(cI:any , cN:any ,request:any): Observable<any> {
      return this.http.get(API_URL + "/categoryController/" 
                    + 'getProductListDeal99?cI='+ cI + '&cN='+cN + '&page='+request.page + '&size=' +request.size, httpOptions);
    }

}
