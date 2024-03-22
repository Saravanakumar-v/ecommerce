import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';
import { trigger,transition,query,style,stagger,animate } from '@angular/animations';
import { category } from './category';
import { search } from './searchlist';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [ 
        query(':enter', [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1}))])
          ], { optional: true }
        )
      ])
  ]),
  ]
})
export class ShopComponent implements OnInit {

  constructor(private api:ProductDataService,private route: Router,private shareData:ProductService,private element:ElementRef) { }

  togglePosition: boolean = false;

  ngOnInit(): void {
    this.shareData.isDarkTheme().subscribe(
      (response) => {
        this.setTheme = response
      },
      (error) => {
        console.log(error);
      }
    )
    this.togglePosition = this.setTheme;
    if(this.setTheme) {
      this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#121212';
    }

    this.getAllProduct();
    this.getCategory();

    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy(): void {
  }

  searchInput = new FormControl();
  searchList: any = search;
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    if (!value) {
      return []; 
    }
    const filterValue = value.toLowerCase();
    const filtered = this.searchList.filter(option => 
      option.toLowerCase().startsWith(filterValue)
    );
  
    if (filtered.length === 0 && value) {
      return ['No item found'];
    } else {
      return filtered;
    }
  }

  // refresh the whole webpage
  refreshPage() {
    this.getAllProduct();
  }
  
  productCategory = ["Electronics","Men","Women","Decoration","Essentials","Others"]
  tabIndex :number;

  allCategory: any;
  getCategory() {
    console.log("function productCategory() {...}");
    this.api.getProductCategory().subscribe(
      (response) => {
        console.log(response);
        this.allCategory = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

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
    this.route.navigateByUrl("/shop/product/:"+product.id);
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

  resetFilter(bool) {
    if(this.isCategoryClicked == true && this.isfilter == true) {
      this.setCategoryClicked(bool);
      this.getAllProduct();
    }

    this.minPrice = 0;
    this.maxPrice = 0;
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


  closemenu = false;
  openMenu(trigger: MatMenuTrigger) {
    this.closemenu = false;
    trigger.openMenu();
  }

  prepareClose(trigger: MatMenuTrigger) {
    this.closemenu = true;
    setTimeout(() => {
      if (this.closemenu) {
        trigger.closeMenu();
      }
    }, 20);
  }

  stopClose(trigger: MatMenuTrigger) {
    this.closemenu = false;
  }

  closeMenu(trigger: MatMenuTrigger) {
    if (this.closemenu) {
      trigger.closeMenu();
    }
  }
  
  setTheme: boolean;
  changeTheme(event) {
    this.shareData.darkTheme = !this.shareData.darkTheme;
    this.setTheme = this.shareData.darkTheme;
    if(this.setTheme) {
      this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#121212';
    } else {
      this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';
    }
    console.log(this.shareData.darkTheme);
  }

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               