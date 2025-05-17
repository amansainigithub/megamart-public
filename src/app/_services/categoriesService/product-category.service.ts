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
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getProductCategory(): Observable<any> {
    return this.http.get(PUBLIC_API_URL + "categoryController/" + 'getProductCategory', httpOptions);
  }


    //Get Product Category Footer (only shows footer Categories)
   getCategoriesFooter(): Observable<any> {
        return this.http.get(PUBLIC_API_URL + "categoryController/" + 'getBabyCategoryFooter', httpOptions);
      }
}
