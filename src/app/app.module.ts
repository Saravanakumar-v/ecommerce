import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './mainpage/shop/shop.component';
import { CartComponent } from './mainpage/cart/cart.component';
import { ProductComponent } from './mainpage/product/product.component';

// @angular/material
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Ng5SliderModule } from 'ng5-slider';



@NgModule({
  declarations: [
    ProductComponent,
    LoginComponent,
    ShopComponent,
    CartComponent,
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    Ng5SliderModule,
    MatSliderModule,
    MatChipsModule,
    BrowserModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
 