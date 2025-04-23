import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  selectedSize: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  onSizeChange(selectedSize: string) {
    this.selectedSize = selectedSize;
    console.log('Size changed:', this.selectedSize);
  }

  //Add To Cart Functionality Starting
  private cartItems: any[] = [];

  addToCart(productData: any): void {

    if(this.cartItems.length >= 50)
    {
        this._snackBar.open('No more items can be added !!' , 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return;
    }

    if (!this.selectedSize) {
      this.toast.warning({
        detail: 'Hey,',
        summary: 'Please Select Size.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }
  
    const productSize = this.selectedSize;
    const productId = productData.id;
  
    const existingItem = this.cartItems.find(
      (item) => item.pId === productId && item.pSize === productSize
    );
  
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        this.toast.warning({
          detail: 'Cart Items',
          summary: 'You cant add more than 10 quantities of the same product.',
          position: 'topRight',
          duration: 2000,
        });
        return;
      }
      existingItem.quantity = Number(existingItem.quantity) + 1;
      existingItem.totalPrice = Number(existingItem.pPrice) * Number(existingItem.quantity);

    } else {
      const cartItem = {
        pId: productData.id,
        pName: productData.productName,
        pPrice: productData.productPrice,
        pBrand: productData.brandField,
        pSize: productSize,
        quantity: 1,
        totalPrice: productData.productPrice,
        pFileUrl: productData.productFilesResponses?.[0]?.fileUrl || '',
        pColor: productData.colorVariant,
        pMrp: productData.productMrp,
        pCalculatedDiscount: productData.calculatedDiscount,
      };
      this.cartItems.push(cartItem);
    }
  
    this.saveCart();
    this.toast.success({
      detail: 'Success',
      summary: 'Item Added to Cart',
      position: 'bottomRight',
      duration: 2000,
    });
  }
  

  buyNow(productData: any): void {
    if (!this.selectedSize) {
      this.toast.warning({
        detail: 'Hey,',
        summary: 'Please Select Size.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }
  
    const productSize = this.selectedSize;
    const productId = productData.id;
  
    const existingItem = this.cartItems.find(
      (item) => item.pId === productId && item.pSize === productSize
    );

    
    
  
    if (existingItem) {
      
      if (existingItem.quantity >= 10) {
        this.toast.warning({
          detail: 'Cart Items',
          summary: 'You cant add more than 10 quantities of the same product.',
          position: 'topRight',
          duration: 2000,
        });
        return;
      }

      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.pPrice * existingItem.quantity;
    } else {
      const cartItem = {
        pId: productData.id,
        pName: productData.productName,
        pPrice: productData.productPrice,
        pBrand: productData.brandField,
        pSize: productSize,
        quantity: 1,
        totalPrice: productData.productPrice,
        pFileUrl: productData.productFilesResponses?.[0]?.fileUrl || '',
        pColor: productData.colorVariant,
        pMrp: productData.productMrp,
        pCalculatedDiscount: productData.calculatedDiscount,
      };
      this.cartItems.push(cartItem);
    }
  
    this.saveCart();
    this.toast.success({
      detail: 'Success',
      summary: 'Item Added to Cart',
      position: 'bottomRight',
      duration: 2000,
    });
  
    this.router.navigateByUrl('/cart');
  }
  

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Convert to string and store in localStorage
  }

  public loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart); // Convert back to array if found
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart'); // Clear localStorage
  }

  removeFromCart(productId: any, productSize: any) {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.pId === productId && item.pSize === productSize)
    );
    this.saveCart();
  }

  updateQuantity(productId: any, productSize: any, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.pId === productId && item.pSize === productSize
    );
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1; // Prevent quantity from going below 1
      item.totalPrice = item.pPrice * item.quantity; // Update total price
      this.saveCart();
    }
  }

  getCartTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + Number(item.totalPrice),
      0
    );
  }

  getCartLength() {
    return this.cartItems.length;
  }

  getTotalMrpPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + Number(item.pMrp) * item.quantity,
      0
    );
  }

  getDiscountPrice(): number {
    return this.getTotalMrpPrice() - this.getCartTotalPrice();
  }
}
