import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  productData: any = [];
  cartList = [];
  fromproduct = false;
  darkTheme: boolean = false;

  isDarkTheme(): Observable<boolean> {
    return of(this.darkTheme)
  }

  addressList = [];

  routeData(para) {
    console.log(para);
    this.productData = para
  }

  addtoCart(para) {
    this.cartList.push(para);
  }
}
