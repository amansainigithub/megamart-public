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
export class OrderService {


  constructor(private http:HttpClient) { }

  getCustomerOrders(userId:any): Observable<any> {
        return this.http.get(PUBLIC_API_URL + "orderController/" + 'getCustomerOrders/'+userId, httpOptions);
   }

   getCustomerOrdersById(orderId:any): Observable<any> {
    return this.http.get(PUBLIC_API_URL + "orderController/" + 'getCustomerOrdersById/'+orderId, httpOptions);
}

  getMyOrdersDelivered(userId:any): Observable<any> {
    return this.http.get(PUBLIC_API_URL + "orderController/" + 'getMyOrdersDelivered/'+userId, httpOptions);
}

orderReturnRequestInitiate(returnRequestForm:any): Observable<any> {
  return this.http.post(PUBLIC_API_URL + "orderController/" + 'orderReturnRequestInitiate',returnRequestForm , httpOptions);
}

orderExchangeRequestInitiate(exchangeRequestForm:any): Observable<any> {
  return this.http.post(PUBLIC_API_URL + "orderController/" + 'orderExchangeRequestInitiate',exchangeRequestForm , httpOptions);
}

invoiceDownload(id:any): Observable<any> {
  return this.http.get(PUBLIC_API_URL + "invoiceDownloadController/" + 'invoiceDownload/'+id, {
    responseType: 'blob' // Specify that the response is binary (PDF)
  });
}
}
