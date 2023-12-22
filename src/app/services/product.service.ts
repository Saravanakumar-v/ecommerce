import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  productData: any;
  cartList = [];

  routeData(para) {
    console.log(para);
    this.productData = para
  }

  addtoCart(para) {
    this.cartList.push(para);
  }
}
