import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './mainpage/shop/shop.component';
import { ProductComponent } from './mainpage/product/product.component';
import { CartComponent } from './mainpage/cart/cart.component';
import { PaymentGatewayComponent } from './mainpage/payment-gateway/payment-gateway.component';

const routes: Routes = [
  {path:"",redirectTo: "login",pathMatch: 'full'},
  {path:"login",component: LoginComponent},
  {path:"shop",component: ShopComponent},
  {path:"shop/product/:id",component: ProductComponent},
  {path:"shop/cart",component: CartComponent},
  {path:"shop/product/:id/payment",component: PaymentGatewayComponent},
  {path:"shop/cart/payment",component: PaymentGatewayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
