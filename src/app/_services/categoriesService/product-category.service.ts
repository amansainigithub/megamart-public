import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/customer/api/v1';


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getProductCategory(): Observable<any> {
    return this.http.get(API_URL + "/categoryController/" + 'getProductCategory', httpOptions);
  }

}
