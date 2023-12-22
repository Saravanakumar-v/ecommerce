import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'], 
})
export class ProductComponent implements OnInit {

  constructor(private sharedData: ProductService,private route: Router,private msg: MatSnackBar) {
    
  }

  ngOnInit(): void {
  }

  orderData = new FormGroup({
    quantity: new FormControl(''),
  });

  productData: any = this.sharedData.productData;
  mainImg: any = this.productData.thumbnail;

  mainImage(imgLink) {
    this.mainImg = imgLink;
  }

  addtoCart(product) {
    this.sharedData.addtoCart(product)
    this.route.navigateByUrl("/shop")
  }

  confirmationMsg() {
    let item = this.productData.title + " added to Cart"
    
    this.msg.open(item,'Close', {
      duration: 2000
    })
  }
}

