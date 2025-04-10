import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReviewsService } from '../../_services/reviewsService/reviews.service';
import { NgToastService } from 'ng-angular-popup';
import { PageEvent } from '@angular/material/paginator';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  stars: number[] = [1, 2, 3, 4, 5];

  //For Pagination 
  unReviewdPageRequest: any = { page: 0, size: 10 };
  unReviewdTotalElements: number = 0;

  reviewPageRequest: any = { page: 0, size: 10 };
  reviewTotalElements: number = 0;

  //Review Decision
  reviewDecison: any = true;
  currentUser: any;
  rating: number = 0;
  unReviewdProduct: any;
  id: any;
  reviewText: string = '';
 
  ratingsMap: { [key: number]: number } = {}; // Stores rating for each product
  file: any;
  imageSrc: string = '';
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _SHS: SnackBarHelperService,
    private token: TokenStorageService,
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    //Current User
    this.currentUser = this.token.getUser();
    this.unReviewDeliveredProduct(this.unReviewdPageRequest);
  }

  //Watch UN-Reviewd Product List
  watchUnReviewdProduct(decision: any) {
    if (decision === 'UNREVIEWS') {
      this.reviewDecison = true;
      this.unReviewDeliveredProduct(this.unReviewdPageRequest);
    } else if (decision === 'REVIWES') {
      this.reviewDecison = false;
      this.getUserReviews(this.reviewPageRequest);
    }
  }
  //Watch UN-Reviewd Product List

  //Get Unreviewd List Starting
  unReviewDeliveredProduct(request: any) {
    this.spinner.show();
    this.reviewsService.unratingDeliveredProduct(request).subscribe({
      next: (res: any) => {
        console.log(res.data.content);
        
        this.unReviewdProduct = res.data.content;
        this.unReviewdTotalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('REVIEWS not Captured Error !!:', err);
        this.spinner.hide();
      },
    });
  }
  //Get Unreviewd List Ending

  //Get Rate Value Starting
  rate(star: number) {
    this.rating = star;
    console.log(this.rating);
  }
  //Get Rating Value Ending

  //File Select Starting
  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      //check File Size
      if (!this.isFileSizeValid(file)) {
        this.toast.warning({
          detail: 'warning',
          summary: 'Please Select a Valid File Size',
          position: 'bottomRight',
          duration: 3000,
        });
        event.target.value = '';
        return;
      }

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.file = event.target.files[0];
    }
    event.target.Value = '';
  }
  //File Select Ending



  //Remove Image Starting
  removeImage() {
    this.file = null;
  }
  //Remove Image Ending

  takeReview(id: any) {
    this.id = id;
    this.reviewModel.show();
  }

  //Submit Review Starting
  submitReview() {
    this.spinner.show();

    if (!this.reviewText || this.rating === 0) {
      return;
    }

    const formData: FormData = new FormData();
      formData.append('rating', this.rating.toString());
      formData.append('reviewText', this.reviewText);
      formData.append('id', this.id);

      if (this.file) {
        formData.append('file', this.file);
      }
    

    this.reviewsService.submitProductReview(formData).subscribe({
      next: (res) => {
        console.log('Review submitted successfully!', res);

        //Calling to unRevied elivered Product List
        this.unReviewDeliveredProduct('');

        //Closing Reviewd Model
        this.closeReviewModal();

        //Open Feedback Model
        this.thanksFeedbackModel.show();

        //Hide Spinner
        this.spinner.hide();

        // Reset form fields
        this.rating = 0;
        this.reviewText = '';
        this.id = '';
        this.file = '';
      },
      error: (err) => {
        console.error('Error submitting review', err);

        //Hide Spinner
        this.spinner.hide();
      },
    });

    //Hide Spinner
    this.spinner.hide();
  }
  //Submit Review Ending....

  nextPageUnreviewd(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.unReviewDeliveredProduct(request);
  }



  

  // ----------------------------------------------------------------------------------------------------------------------

  // REVIEWS AREA STARTING
  // ====================================================================================================================
  // ====================================================================================================================
  reviewsData: any;

  reviewId:any;
  updateReviewRating: any;
  updateReviewText: any;
  updateReviewImageSrc: any;
  updateReviewfile: any;

  //Get Unreviewd List Starting
  getUserReviews(request: any) {
    this.spinner.show();
    this.reviewsService.getUserReviews(request).subscribe({
      next: (res: any) => {
        console.log(res.data.content);
        this.reviewsData = res.data.content;
        this.reviewTotalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('REVIEWS not Captured Error !!:', err);
        this.spinner.hide();
      },
    });
  }

  nextPage(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getUserReviews(request);
  }

  getReviewToEdit(id: any) {
    const reviewData = this.reviewsData.find((rv: any) => rv.id === id);
    if (reviewData) {
      console.log('Found review:', reviewData);
      this.reviewId = reviewData.id;
      this.updateReviewRating = reviewData.rating;
      this.updateReviewText = reviewData.review;

      console.log(this.reviewsData);

      // Iterate over productReviewFiles
      for (let i = 0; i < reviewData.productReviewFiles.length; i++) {
        this.updateReviewImageSrc = reviewData.productReviewFiles[i].reviewFileUrl;
        break;
      }

      this.updateReviewModel.show();
    } else {
      console.warn('Review not found with id:', id);
    }
  }

  //Update Rate Value Starting
  updateRate(star: number) {
    this.updateReviewRating = star;
  }



  //Update Review File Select Starting
  onUpdateReviewFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      //check File Size
      if (!this.isFileSizeValid(file)) {
        this.toast.warning({
          detail: 'warning',
          summary: 'Please Select a Valid File Size',
          position: 'bottomRight',
          duration: 3000,
        });
        event.target.value = '';
        return;
      }

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateReviewImageSrc = reader.result as string;
      };
      this.updateReviewfile = event.target.files[0];
    }
    event.target.Value = '';
  }
  //Update Review Rating File Ending



//Remove Image Starting
  removeEditReviewImage() {
      this.updateReviewImageSrc = null;
  }
//Remove Image Ending
  


updateReview(){

    if (!this.updateReviewText || this.updateReviewRating === 0) {
      return;
    }

  const formData = new FormData();
  formData.append('id', this.reviewId.toString());
  formData.append('reviewText', this.updateReviewText);
  formData.append('rating', this.updateReviewRating.toString());

  if (this.updateReviewfile) {
    formData.append('file', this.updateReviewfile);
  }
    
    this.reviewsService.udapteReview(formData).subscribe({
      next: (res) => {
        console.log('Review submitted successfully!', res);

        //Hide update Review Model
        this.updateReviewModel.hide();

        this.toast.success({
          detail: 'success',
          summary: 'Feedback Update Successfully',
          position: 'bottomRight',
          duration: 2000,
        });

         //get User Review List
         this.getUserReviews(this.reviewPageRequest);

         //Hide Spinner
         this.spinner.hide();
      },
      error: (err) => {
        console.error('Error submitting review', err);

        //Hide Spinner
        this.spinner.hide();
      },
    });
}

  //REVIEWS AREA ENDING

















  // ===========Review Model Open Close Starting===========
  reviewModel: any;
  updateReviewModel: any;
  thanksFeedbackModel: any;
  ngAfterViewInit() {
    this.reviewModel = new bootstrap.Modal(
      document.getElementById('reviewModel')
    );
    this.updateReviewModel = new bootstrap.Modal(
      document.getElementById('updateReviewModel')
    );

    this.thanksFeedbackModel = new bootstrap.Modal(
      document.getElementById('thanksFeedbackModel')
    );
  }
  closeReviewModal() {
    this.reviewModel.hide();
  }

  closeThanksFeedbackModal() {
    this.thanksFeedbackModel.hide();
  }

  // ===========Review Model Open Close Ending ===========

    //FileSize Check Starting (3MB) JUST NOW
    isFileSizeValid(file: File): boolean {
      const maxSizeInBytes = 2 * 1024 * 1024; // 3MB
      return file.size <= maxSizeInBytes;
    }
    //FileSize Check Ending..



}
