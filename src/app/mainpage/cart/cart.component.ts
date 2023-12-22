import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private sharedData: ProductService) { }

  ngOnInit(): void {
    for(let cartItem of this.cartList) {
      this.total = this.total + cartItem.price;
    }

  }

  cartList = this.sharedData.cartList;

  total: number = 0;

  
}
