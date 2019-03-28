import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import {Order} from '../shared/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }


  singleProduct(id): Observable<any> {
    const categoryUrl = 'product/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }

  placeOrder(data: Order): Observable<any> {
    const categoryUrl = 'orderproduct/';
    const url: string = this.serviceUrl + categoryUrl ;
    return this.httpClient.post<Order>(url, data);
  }
}
