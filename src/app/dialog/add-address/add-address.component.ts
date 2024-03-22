import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  constructor(private sharedData:ProductService,public dialog: MatDialogRef<AddAddressComponent>) { }

  ngOnInit(): void {
  }

  address = new FormGroup({
    username: new FormControl('',[
      Validators.maxLength(15),
      Validators.required]),
    houseno: new FormControl('',[
      Validators.required,
      Validators.maxLength(3)]),
    streetname: new FormControl(''),
    contact: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    city: new FormControl('',[Validators.required]),
    pincode: new FormControl('',[Validators.required,Validators.maxLength(6),Validators.minLength(6)])
  })

  isInvalid: boolean = false;
  addAddress() {
    let temp = [];
    temp = JSON.parse(localStorage.getItem("address"))
    if(this.address.valid) {
      temp.push(this.address.value);
  
      localStorage.setItem("address",JSON.stringify(temp));
      this.sharedData.addressList.push(temp)
      this.dialog.close();
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }

  onlyNumber(event) {
    const regex = /(0|[1-9]\d*)/i;
    const isValidInput = regex.test(event.key);
    return isValidInput;
  }

  onlyString(event) {
    const regex = /[ a-zA-Z]/i;
    const isValidInput = regex.test(event.key);
    return isValidInput;
  }

  close() {
    this.dialog.close();
  }
  

}
