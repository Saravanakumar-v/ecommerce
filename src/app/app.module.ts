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
import { AddAddressComponent } from './dialog/add-address/add-address.component';
import { PaymentGatewayComponent } from './mainpage/payment-gateway/payment-gateway.component';
import { FilterComponent } from './mainpage/shop/filter/filter.component';

// @angular/material
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaymentInfoComponent } from './mainpage/payment-gateway/payment-info/payment-info.component';

@NgModule({
  declarations: [
    ProductComponent,
    LoginComponent,
    ShopComponent,
    CartComponent,
    AppComponent,
    PaymentGatewayComponent,
    AddAddressComponent,
    FilterComponent,
    PaymentInfoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    MatChipsModule,
    MatInputModule,
    BrowserModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
 