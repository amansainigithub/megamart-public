import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PUBLIC_API_URL } from '../../URL/ApiUrls';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  unratingDeliveredProduct(id: any): Observable<any> {
    return this.http.get( PUBLIC_API_URL +'productReviewsController/' + 'unReviewDeliveredProduct/12',httpOptions);
  }

  getUserReviews(request: any): Observable<any> {
    return this.http.get( PUBLIC_API_URL +'productReviewsController/' + 'getUserReviews?page='+request.page + 
                        '&size=' +request.size , httpOptions);
  }

  submitProductReview(formData: FormData) {
    return this.http.post(PUBLIC_API_URL + 'productReviewsController/' + 'submitProductReview', formData );
  }

  getEditReview(reviewId: any): Observable<any> {
    return this.http.get( PUBLIC_API_URL +'productReviewsController/' + 'getEditReview/'+reviewId, httpOptions);
  }

  udapteReview(formData: FormData) {
    return this.http.post(PUBLIC_API_URL + 'productReviewsController/' + 'updateReviews', formData );
  }
}
