import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient) { }

  getProductCategory() {
    return this.http.get('https://dummyjson.com/products/categories');
    // return this.http.get('https://api.escuelajs.co/api/v1/categories')
  }

  getCategoryResponse(para: any) {
    return this.http.get('https://dummyjson.com/products/category/'+para);
  }

  everyProduct() {
    return this.http.get('https://dummyjson.com/products');
  }

  allProduct(limit=10,skip=0) {
    console.log("limit:"+limit+",skip:"+skip);
    
    // console.log(limit);
    return this.http.get('https://dummyjson.com/products?limit='+limit+"&skip="+skip);
  }

  searchProduct(request) {
    return this.http.get('https://dummyjson.com/products/search?q='+request);
  }

  getSingleProduct(request) {
    return this.http.get('https://dummyjson.com/products/'+request);
  }
}

