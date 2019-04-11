import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {  ProductListComponent } from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {PlaceOrderComponent} from './place-order/place-order.component';

const routes: Routes = [
  {
    path: 'productlist/:catId',
    component: ProductListComponent
  },
  {
    path: 'productview/:id',
    component: ProductDetailComponent
  },
  {
    path: 'shopping',
    component: ShoppingCartComponent
  },
  {
    path: 'placeorder',
    component: PlaceOrderComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProductRoutingModule { }
