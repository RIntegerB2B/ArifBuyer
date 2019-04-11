import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import {SingleProductOrder} from '../shared/model/singleProductOrder.model';
import {AddressModel} from '../account-info/address/address.model';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  mainServiceUrl: string = AppSetting.mainServiceUrl;
  constructor(private httpClient: HttpClient) { }



  placeOrder(data: SingleProductOrder): Observable<any> {
    const categoryUrl = 'orderproduct/';
    const url: string = this.serviceUrl + categoryUrl ;
    return this.httpClient.post<SingleProductOrder>(url, data);
  }
 
// customer Details
getCustomerDetails(id): Observable<any> {
  const filterURL = 'customerDetail/' + id;
  const url: string = this.serviceUrl + filterURL;
  return this.httpClient.get<Product>(url);
}

// add new addres details
getaddressDetails(addressHolder, id): Observable<AddressModel> {
  const urladdress = this.serviceUrl + 'addressupdate/' + id;
  return this.httpClient.put<AddressModel>(urladdress, addressHolder);
}

}
