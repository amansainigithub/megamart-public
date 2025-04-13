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
export class ProductSService {

    constructor(private http: HttpClient) { }
  
    getProductS(cI:any , cN:any ,request:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "categoryController/" 
                    + 'getProductListByCategoryId?cI='+ cI + '&cN='+cN + '&page='+request.page + '&size=' +request.size, httpOptions);
    }

    getProductListByBornCategoryIdService(cI:any , cN:any ,request:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "categoryController/" 
                    + 'getProductListByBornCategoryId?cI='+ cI + '&cN='+cN + '&page='+request.page + '&size=' +request.size, httpOptions);
    }


    productSearch(searchKey:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "categoryController/" + 'productSearching?searchKey='+searchKey, httpOptions);
    }

}
