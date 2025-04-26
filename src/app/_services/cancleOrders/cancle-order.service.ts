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
export class CancleOrderService {

  constructor(private http:HttpClient) { }

  cancelOrderServic(cancleOrderData: any): Observable<any> {
    return this.http.post(PUBLIC_API_URL + 'orderCancelController/orderCancel', cancleOrderData ,httpOptions);
  }
  

  getCustomerCancelOrders(userId:any): Observable<any> {
          return this.http.get(PUBLIC_API_URL + "orderCancelController/" + 'getCancelOrders/'+userId, httpOptions);
     }
  
}
