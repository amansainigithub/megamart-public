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
export class DashboardService {

  
    constructor(private http: HttpClient) { }
  
   getDashboard(username:any): Observable<any> {
      return this.http.get(PUBLIC_API_URL + "dashboardController/" + 'getDashboard/'+username , httpOptions);
    }
}
