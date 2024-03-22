import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private sharedData: ProductService,private api: ProductDataService,private router: Router) { }

  setTheme: boolean;
  ngOnInit(): void {
    this.sharedData.isDarkTheme().subscribe(
      (response) => {
        this.setTheme = response;
      }
    )
    this.total =  this.calculateTotal(this.cartList);

    console.log(this.cartList.length);
  }

  cartList = this.sharedData.cartList;
  total: number = 0;

  // defaultPrice: number;
  // calculatePrice(qty, cartItem) {
  //   let productPrice: any;
  //   this.api.getSingleProduct(cartItem.id).subscribe(
  //     (response) => {
  //       productPrice = (response as any).price;
  //       cartItem.price = qty * productPrice;        
  //       this.total = this.calculateTotal(this.cartList);
  //     }
  //   )  
  // }

  calculateTotal(list) {
    let temp = 0;
    for(let item of list) {
      temp = temp + item.price
    }
    return temp;
  }

  removeCartItem(index) {
    this.cartList.splice(index,1)
    this.total = this.calculateTotal(this.cartList);
  }

  navigate() {
    this.router.navigateByUrl("/shop");
  }

  toCheckout() {
    this.sharedData.fromproduct = false;
    this.router.navigateByUrl("/shop/cart/payment")
  }
}

