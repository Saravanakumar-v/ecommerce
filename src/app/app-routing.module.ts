import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './mainpage/shop/shop.component';
import { ProductComponent } from './mainpage/product/product.component';
import { CartComponent } from './mainpage/cart/cart.component';

const routes: Routes = [
  {path:"",redirectTo: "login",pathMatch: "full"},
  {path:"login",component: LoginComponent},
  {path:"shop",component: ShopComponent},
  {path:"shop/product",component: ProductComponent},
  {path:"shop/cart",component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
