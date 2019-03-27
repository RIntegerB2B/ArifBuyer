import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {PlaceOrderComponent} from './place-order/place-order.component';
const routes: Routes = [
  {
    path: 'placeorder/:id',
    component: PlaceOrderComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdermanagementRoutingModule { }
