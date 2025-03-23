import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  selectedSize: string = '';

  constructor(
        private spinner: NgxSpinnerService,
        private toast:NgToastService,
        private router:Router
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

addToCart(productId: string, 
          productName: string, 
          productPrice: number, 
          brandField: string , 
          fileUrl:any , 
          colorVariant:any,
          productMrp:any,
          calculatedDiscount:any): void {

  if(this.selectedSize === null || this.selectedSize === undefined || this.selectedSize === ''){
    alert("Please Select Size.");
    return;
  }

  //using for ProductSize
  const productSize = this.selectedSize;

  console.log(productId, productName, productPrice, brandField, productSize);

  const existingItem = this.cartItems.find(item => item.pId === productId && item.pSize === productSize);

  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity) + 1;
    existingItem.totalPrice = existingItem.pPrice * existingItem.quantity; // Update total price
}
 else {
      const cartItem = {
          pId: productId,
          pName: productName,
          pPrice: productPrice,
          pBrand: brandField,
          pSize: productSize,
          quantity: 1,
          totalPrice: productPrice,
          pFileUrl:fileUrl,
          pColor:colorVariant,
          pMrp:productMrp,
          pCalculatedDiscount:calculatedDiscount
      };
      this.cartItems.push(cartItem);
  }

  this.saveCart();
  this.toast.success({detail:"Success",summary:"Item Added to Cart", position:"bottomRight",duration:2000});
}



buyNow( productId: string, 
        productName: string, 
        productPrice: number, 
        brandField: string , 
        fileUrl:any , 
        colorVariant:any,
        productMrp:any,
        calculatedDiscount:any): void {
if(this.selectedSize === null || this.selectedSize === undefined || this.selectedSize === ''){
alert("Please Select Size.");
return;
}

//using for ProductSize
const productSize = this.selectedSize;

console.log(productId, productName, productPrice, brandField, productSize);

const existingItem = this.cartItems.find(item => item.pId === productId && item.pSize === productSize);

if (existingItem) {
existingItem.quantity = Number(existingItem.quantity) + 1;
existingItem.totalPrice = existingItem.pPrice * existingItem.quantity; // Update total price
}
else {
const cartItem = {
  pId: productId,
  pName: productName,
  pPrice: productPrice,
  pBrand: brandField,
  pSize: productSize,
  quantity: 1,
  totalPrice: productPrice,
  pFileUrl:fileUrl,
  pColor:colorVariant,
  pMrp:productMrp,
  pCalculatedDiscount:calculatedDiscount
};
this.cartItems.push(cartItem);
}

this.saveCart();
this.toast.success({detail:"Success",summary:"Item Added to Cart", position:"bottomRight",duration:2000});
this.router.navigateByUrl("/cart");
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
  this.cartItems = this.cartItems.filter(item => !(item.pId === productId && item.pSize === productSize));
  this.saveCart();
}

updateQuantity(productId: any, productSize: any, quantity: number) {
  const item = this.cartItems.find(item => item.pId === productId && item.pSize === productSize);
  if (item) {
    item.quantity = quantity > 0 ? quantity : 1; // Prevent quantity from going below 1
    item.totalPrice = item.pPrice * item.quantity; // Update total price
    this.saveCart();
  }
}

getCartTotalPrice(): number {
  return this.cartItems.reduce((total, item) => total + Number(item.totalPrice), 0);
}


getCartLength(){
    return this.cartItems.length;
}

getTotalMrpPrice(): number {
  return this.cartItems.reduce((total, item) => total + Number(item.pMrp) * item.quantity, 0);
}

getDiscountPrice(): number {
  return this.getTotalMrpPrice() - this.getCartTotalPrice();
}

}
