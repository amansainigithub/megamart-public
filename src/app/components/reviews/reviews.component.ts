import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  rating: number = 0;
stars: number[] = [1, 2, 3, 4, 5];

rate(star: number) {
  this.rating = star;

  console.log(this.rating);
  
}


}
