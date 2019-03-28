import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import {SingleProductOrder} from '../shared/model/singleProductOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  mainServiceUrl: string = AppSetting.mainServiceUrl;
  constructor(private httpClient: HttpClient) { }


  singleProduct(id): Observable<any> {
    const categoryUrl = 'product/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }

  placeOrder(data: SingleProductOrder): Observable<any> {
    const categoryUrl = 'orderproduct/';
    const url: string = this.serviceUrl + categoryUrl ;
    return this.httpClient.post<SingleProductOrder>(url, data);
  }
  findMOQ(id): Observable<any> {
    const categoryUrl = 'moq/';
    const url: string = this.mainServiceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }

}
