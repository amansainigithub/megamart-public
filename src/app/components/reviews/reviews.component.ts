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

  pageRequest: any = { page: 0, size: 10 };

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
    this.unReviewDeliveredProduct('');
  }

  //Watch UN-Reviewd Product List
  watchUnReviewdProduct(decision: any) {
    if (decision === 'UNREVIEWS') {
      this.reviewDecison = true;
      this.unReviewDeliveredProduct('');
    } else if (decision === 'REVIWES') {
      this.reviewDecison = false;
      this.getUserReviews(this.pageRequest);
    }
  }
  //Watch UN-Reviewd Product List

  //Get Unreviewd List Starting
  unReviewDeliveredProduct(id: any) {
    this.spinner.show();
    this.reviewsService.unratingDeliveredProduct(id).subscribe({
      next: (res: any) => {
        this.unReviewdProduct = res.data;
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

  //Submit Review Starting
  submitReview() {
    this.spinner.show();

    if (!this.reviewText || this.rating === 0) {
      return;
    }

    const formData: FormData = new FormData();
    if (this.file) {
      formData.append('rating', this.rating.toString());
      formData.append('reviewText', this.reviewText);
      formData.append('id', this.id);
      formData.append('file', this.file);
    }

    this.reviewsService.submitProductReview(formData).subscribe({
      next: (res) => {
        // console.log("Review submitted successfully!", res);

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

  // ========================================================================================================================
  // ========================================================================================================================




  // REVIEWS AREA STARTING
  reviewsData: any;
  totalElements: number = 0;

  reviewId: any;
  updateRating: any;
  updateReviewText: string = '';
  updateImageSrc: string = '';

  //Get Unreviewd List Starting
  getUserReviews(request: any) {
    this.spinner.show();
    this.reviewsService.getUserReviews(request).subscribe({
      next: (res: any) => {
        this.reviewsData = res.data.content;
        this.totalElements = res.data['totalElements'];
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

  //Get Unreviewd List Ending
  editReview(reviewId: any) {
    this.spinner.show();
    this.reviewsService.getEditReview(reviewId).subscribe({
      next: (res: any) => {
        console.log(res.data);

        this.reviewId = res.data.id;
        this.updateRating = res.data.rating;
        this.updateReviewText = res.data.review;
        this.updateImageSrc = res.data.reviewFileUrl;
        this.updateReviewModel.show();

        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('REVIEWS not Captured Error !!:', err);
        this.spinner.hide();
      },
    });
  }

  //Update File Select Starting
  updatefile: any;
  updateOnFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [updatefile] = event.target.files;

      //check File Size
      if (!this.isFileSizeValid(updatefile)) {
        this.toast.warning({
          detail: 'warning',
          summary: 'Please Select a Valid File Size',
          position: 'bottomRight',
          duration: 3000,
        });
        event.target.value = '';
        return;
      }

      reader.readAsDataURL(updatefile);
      reader.onload = () => {
        this.updateImageSrc = reader.result as string;
      };
      this.updatefile = event.target.files[0];
    }
    event.target.Value = '';
  }
  //Update File Select Ending

  //Remove Image Starting
  updateRemoveImage() {
    this.updateImageSrc = '';
  }
  //Remove Image Ending

  updateReview() {
    // this.spinner.show();

    // if (!this.updateReviewText || this.updateRating === 0) {
    //   return;
    // }
    console.log('==============AMAN SAINI===========');
    console.log(this.updateReviewText);
    console.log(this.reviewId);

    const formData: FormData = new FormData();
    if (this.file) {
      // formData.append('rating',this.updateRating.toString());
      formData.append('reviewText', this.updateReviewText);
      formData.append('id', this.reviewId);
      formData.append('file', this.updatefile);
    }

    for (let pair of (formData as any).entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    console.log('=========================');
  }

  // ===========Review Model Open Close Starting===========
  modal: any;
  updateReviewModel: any;
  thanksFeedbackModel: any;
  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('reviewModel'));
    this.updateReviewModel = new bootstrap.Modal(
      document.getElementById('updateReviewModel')
    );
    this.thanksFeedbackModel = new bootstrap.Modal(
      document.getElementById('thanksFeedbackModel')
    );
  }
  closeReviewModal() {
    this.modal.hide();
  }

  closeUpdateReviewModal() {
    this.updateReviewModel.hide();
  }

  closeThanksFeedbackModal() {
    this.thanksFeedbackModel.hide();
  }

  takeReview(id: any) {
    this.id = id;
    this.modal.show();
  }
  // ===========Review Model Open Close Ending ===========


    //FileSize Check Starting (3MB) JUST NOW
    isFileSizeValid(file: File): boolean {
      const maxSizeInBytes = 2 * 1024 * 1024; // 3MB
      return file.size <= maxSizeInBytes;
    }
    //FileSize Check Ending..
}
