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
export class RazorpayService {

 constructor(private http:HttpClient) { }

    createOrderPaymentService(amount:any,cart:any): Observable<any> {
          return this.http.post(PUBLIC_API_URL + "paymentController/" + 'createOrder?amount='+amount, cart, httpOptions);
        }


    paymentTransaction(paymentTransaction: any): Observable<any> {
       return this.http.post(PUBLIC_API_URL + "paymentController/"+ 'orderUpdate', paymentTransaction);
     }
        
}
