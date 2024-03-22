import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'], 
})
export class ProductComponent implements OnInit {

  constructor(private sharedData: ProductService,private route: Router,private msg: MatSnackBar,private element: ElementRef) {
    
  }

  setTheme: boolean;
  ngOnInit(): void {
    this.sharedData.isDarkTheme().subscribe(
      (response) => {
        this.setTheme = response;
      }
    )
    if(this.setTheme) {
      this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#121212';
    }
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

  checkOut(product) {
    this.sharedData.fromproduct = true;
    this.sharedData.productData = product;
    this.route.navigateByUrl("shop/product/:"+this.productData.id+"/payment")
  }
}

