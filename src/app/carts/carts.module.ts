import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ProductsModule } from '../products/products.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    ProductsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class CartsModule { }
