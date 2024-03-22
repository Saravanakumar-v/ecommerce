import { Component, OnInit } from '@angular/core';
import { AddAddressComponent } from 'src/app/dialog/add-address/add-address.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  constructor(public route:Router,public dialog: MatDialog,private sharedData:ProductService,private element: ElementRef) {
  }

  setTheme: boolean;
  ngOnInit(): void {
    this.sharedData.isDarkTheme().subscribe(
      (response) => {
        this.setTheme = response;
      }
    )

    let address = JSON.parse(localStorage.getItem("address"))
    this.addressList = address;
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
