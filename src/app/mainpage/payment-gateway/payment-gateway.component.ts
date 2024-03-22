import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAddressComponent } from 'src/app/dialog/add-address/add-address.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(public route:Router,public dialog: MatDialog,private sharedData:ProductService,private element: ElementRef) {
  }

  setTheme: boolean = true
  ngOnInit(): void {    
    this.sharedData.isDarkTheme().subscribe(
      (response) => {
        this.setTheme = response;
      }
    )
    if(this.setTheme) {
      this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#121212';
    }

    let address = JSON.parse(localStorage.getItem("address"))
    this.addressList = address;

    if(this.sharedData.fromproduct == true) {
      this.orderList.push(this.sharedData.productData);
    } else {
      this.orderList = this.sharedData.cartList;
    }
    console.log(this.sharedData.productData);

    this.orderTotal = this.calculateTotal(this.orderList)
  }

  addressList = [];
  orderList = [];
  address: any;
  addressConfirmation = true;
  paymentConfirmation = true;
  radioSelected = false;
  paymentSelected = false;
  orderTotal: number;

  paymentradioSelected: boolean = false;
  paymenttype: any;
  selectPayment() {
    this.nextPanel(3);
    this.paymentSelected = true;
    this.paymenttype = "Cash on Delivery/Pay on Delivery"
  }

  calculateTotal(orderList) {
    let total = 0;
    for(let i of this.orderList) {
      total = total + i.price;
    }
    return total;
  }

  addAddress() {
    this.dialog.open(AddAddressComponent);
  }

  globalIndex: any;
  isaddressSelected: boolean = false;
  selectAddress(index) {
    this.globalIndex = index;
    this.isaddressSelected = true;
    console.log(this.addressList[index]);
  }

  placeOrder:boolean = true
  panel = 1;
  nextPanel(panelIndex) {
    if(this.isaddressSelected == false && this.paymentSelected == false) {
      document.getElementById("selectAddress").style.color = 'red';
      document.getElementById("payment").style.color = 'red';
    } 
    else if(this.isaddressSelected == true || this.paymentSelected == true) {
      this.panel = panelIndex;
      this.address = this.addressList;
      this.radioSelected = true;

      this.address = this.addressList[this.globalIndex];
      console.log(this.panel);    
    } 
  }

  confirmOrder() {
    if(this.isaddressSelected == false && this.paymentSelected == false) {
      document.getElementById("selectAddress").style.color = 'red';
      document.getElementById("payment").style.color = 'red';
    } 
    if(this.radioSelected == true && this.paymentSelected == true) {
      this.placeOrder = false;
    }
  }

  orderConfirmed() {
    alert(`Hello ${this.address.username}, your order of $${this.orderTotal}.00 has been confirmed, your invoice link will be sent to your contact number.`)
    this.route.navigateByUrl("/shop")
  }

}
