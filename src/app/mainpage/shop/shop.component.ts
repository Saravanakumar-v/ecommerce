import { Component, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';
import { category } from './category';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { trigger,transition,query,style,stagger,animate } from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [ 
        query(':enter', [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s linear', style({ opacity: 1}))])
          ], { optional: true }
        )
      ])
  ]),
  ]
})
export class ShopComponent implements OnInit {

  constructor(private api:ProductDataService,private route: Router,private shareData:ProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  productCategory = ["Electronics","Men","Women","Decoration","Essentials","Others"]
  tabIndex :number;

  // allCategory: any;
  // getCategory() {
  //   console.log("function productCategory() {...}");
  //   this.api.getProductCategory().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.allCategory = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  onKeyPress(event: KeyboardEvent): boolean {
    const regex = /[a-z A-Z]/i;
    const isValidInput = regex.test(event.key);
    return isValidInput;
  }

  allProductList = [];
  getAllProduct(limit?: any,skip?: any) {
    console.log("function getAllProduct() {...}");

    if(this.tabIndex != 0 && this.isCategoryClicked == false) {
      this.tabIndex = 0;
    }

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

  skipCount = 1;
  @HostListener('window:scroll', ['$event'])
  infiniteScroll(event) {
    let limit = 10;

    if (window.innerHeight+window.scrollY >= document.body.offsetHeight) {
      console.log("function infiniteScroll() {...}");
      this.getAllProduct(limit,limit*this.skipCount);
      this.skipCount++;
    }
  }

  getProduct() {
    this.api.allProduct().subscribe(
      (response) => {
        for(let item of (response as any).products) {
          this.allProductList.push(item)
        }
      }
    )
  }

  isCategoryClicked: boolean = false;
  setCategoryClicked(bool) {
    this.isCategoryClicked = bool;
  }

  list: any;
  categoryList(para) {
    console.log("function categoryList() {...}");
    this.list = category[para];
  }

  productList: any;
  categoryProducts: any;
  categoryProduct(request: any,category: any) {
    this.categoryProducts = category;

    console.log("function categoryProduct() {...}");
    if(this.tabIndex != 0) {
      this.tabIndex = 0;
    }

    this.api.getCategoryResponse(request)
    .subscribe(
      (response) => {
        console.log(response)
        this.allProductList = (response as any).products
      },
      (error) => {
        console.log(error);
      }
    )
  }

  viewProduct(product) {
    this.shareData.routeData(product)
    this.route.navigateByUrl("/shop/product");
  }

  cartList = []
  cartLength: number = this.shareData.cartList.length;
  addtoCart() {
    this.route.navigateByUrl('/shop/cart')
  }

  searchProduct(para) {
    this.api.searchProduct(para).subscribe(
      (response) => {
        console.log(response);
        this.allProductList = (response as any).products
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // filter
  minPrice: number = 10;
  maxPrice: number = 10;
  rangeOption = { 
    floor: 10,
    ceil: 1000,
  }
  rangeFunction(event) {
    console.log(event);
    this.maxPrice = event;
  }

  inputType:string = "button"
  changeInputType(para) {
    console.log(para);
    this.inputType = para;
  }

  filterList(value1?:10,value2?:10,fromSlider?: boolean) {
    this.tabIndex = 0;
    let temp = [];
    if(!fromSlider) {
      let temp = {
        floor: value1,
        ceil: value2
      }
      this.rangeOption = temp;
    }

    this.api.everyProduct().subscribe(
      (response) => {
        for(let i of (response as any).products) {
          if(i.price <= value2 && i.price >= value1) {
            temp.push(i);
          } else if(i.price == value2) {
            temp.push(i)
          }
        }
      }
    )
    
    this.allProductList = temp;
    this.setCategoryClicked(true)
  }

  resetFilter(bool) {
    this.getAllProduct();
    this.setCategoryClicked(bool);

    this.rangeOption = {
      floor: 0,
      ceil: 1000
    }
    this.minPrice = 10;
    this.maxPrice = 1000;
  }
  
  // sort item
  sortList(para) {
    console.log(this.tabIndex);
    this.tabIndex = para.index;

    if(para.index == 1) {
      this.allProductList = this.allProductList.sort((a,b) => {
        if(a.price < b.price) {
          return -1;
        }
      })
    } else if(para.index == 2) {
      this.allProductList = this.allProductList.sort((a,b) => {
        if(a.price > b.price) {
          return -1;
        }
      }) 
    }
    else if(para.index == 3) {
        this.allProductList = this.allProductList.sort((a,b) => {
          if(a.discountPercentage > b.discountPercentage) {
            return -1;
          }
        })
      }
    }


}
