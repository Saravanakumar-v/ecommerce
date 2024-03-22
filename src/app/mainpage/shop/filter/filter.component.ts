import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private api:ProductDataService) { }

  ngOnInit(): void {
  }

  resetFilter(bool) {
    if(this.isCategoryClicked == true && this.isfilter == true) {
      this.setCategoryClicked(bool);
      this.getAllProduct();
    }

    this.minPrice = 0;
    this.maxPrice = 0;
  }

  // filter
  minPrice: number = 0;
  maxPrice: number = 0;
  inputType:string = "button"
  changeInputType(para) {
    console.log(para);
    this.inputType = para;
  }

  temp= [];
  isfilter: boolean = false;
  filterList(value1?:1,value2?:1000) {
    this.isfilter = true;
    this.api.allProduct(100,0).subscribe(
      (response) => {
        for(let index of (response as any).products) {
          this.temp.push(index);
        }
        this.allProductList = this.temp.filter(value => value.price >= value1 && value.price <= value2)
      }
    )
    this.temp = [];
    this.setCategoryClicked(true);
  }

  isCategoryClicked: boolean = false;
  setCategoryClicked(bool) {
    this.isCategoryClicked = bool;
  }

  allProductList = [];
  getAllProduct(limit?: any,skip?: any) {
    console.log("function getAllProduct() {...}");

    if(this.isCategoryClicked != true) {
      this.api.allProduct(limit,skip)
      .subscribe(
        (response) => {
        console.log(response);
        for(let index of (response as any).products) {
          this.allProductList.push(index);
        }
      },
      (error) => {
        console.log(error);
      })
    }
  }


}

