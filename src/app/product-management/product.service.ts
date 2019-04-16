import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import { PublicService } from '../shared/public/publicService';
import { Cart } from '../shared/model/cart.model';
import {AddressModel} from '../account-info/address/address.model';
import {Order} from '../shared/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string;
  cartCount = 0;
  a: Product[] = [];
  mainServiceUrl: string;

  constructor(private httpClient: HttpClient, private publicService: PublicService) {
    this.serviceUrl = publicService.getConfigType().serviceUrl;
    this.mainServiceUrl = AppSetting.mainServiceUrl;
  }
// moq

findAllMOQ(): Observable<any> {
  const categoryUrl = 'moqs';
  const url: string = this.mainServiceUrl + categoryUrl;
  return this.httpClient.get<Product>(url);
}
  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }
  getViewCategory(id): Observable<any> {
    const categoryUrl = 'categoryDetails/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }
  lowPriceCategory(id): Observable<any> {
    const categoryUrl = 'lowcategoryDetails/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }
  highPriceCategory(id): Observable<any> {
    const categoryUrl = 'highcategoryDetails/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }

  // filter

  filterByPrice(id, data): Observable<any> {
    const categoryUrl = 'category/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.put<Product>(url, data);
  }

  filterByColor(id, data): Observable<any> {
    const categoryUrl = 'categoryColor/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.put<Product>(url, data);
  }
  // view single product

  singleProduct(id): Observable<any> {
    const categoryUrl = 'product/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }

  getRelatedProducts(data): Observable<any> {
    const productUrl = 'relatedproducts/';
    const productUrl1 = '/product/';
    const url: string = this.serviceUrl + productUrl + data.styleCode + productUrl1 + data._id;
    return this.httpClient.get<Product>(url);
  }

  // read the filter menu

getFilterData(): Observable<any> {
  const filterURL = 'productSettings/';
  const url: string = this.mainServiceUrl + filterURL;
  return this.httpClient.get<Product>(url);
}
addToCart(cart): Observable<Cart>  {
  const cartUrl = 'cart/';
  const url: string = this.serviceUrl + cartUrl;
  return this.httpClient.post<Cart>(url, cart);
}
addToCartTest(prod) {
  const categoryUrl = 'cart';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.post<Product>(url, prod);
}
deleteToCart(userid, proId) {
  const cartUrl = 'cart/';
  const productUrl = '/deleteproduct/';
  const url: string = this.serviceUrl + cartUrl + userid + productUrl + proId._id;
  return this.httpClient.delete<Cart>(url);
}
shoppingUser(userId) {
  const shoppingUrl = 'cart/';
  const url: string = this.serviceUrl + shoppingUrl + userId;
  return this.httpClient.get<Cart>(url);
}
shoppingCart() {
  const shoppingUrl = 'shopping/';
  const url: string = this.serviceUrl + shoppingUrl;
  return this.httpClient.get<Product>(url);
}

addToCartMinus(cart)   {
  const cartUrl = 'cart/';
  const productUrl = '/decproduct/';
  const url: string = this.serviceUrl + cartUrl + cart.userId + productUrl + cart.product.productId;
  return this.httpClient.put<Product>(url, cart);
}

/* placeOrder(data: SingleProductOrder): Observable<any> {
  const categoryUrl = 'orderproduct/';
  const url: string = this.serviceUrl + categoryUrl ;
  return this.httpClient.post<SingleProductOrder>(url, data);
} */

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

// place the order

placeOrder(orderdetails: Order): Observable<Order>  {
  const cartUrl = 'orders/';
  const url: string = this.serviceUrl + cartUrl;
  return this.httpClient.post<Order>(url, orderdetails);
}

clearCart(id): Observable<Order>  {
  const cartUrl = 'cart/' + id;
  const url: string = this.serviceUrl + cartUrl ;
  return this.httpClient.delete<Order>(url);
}


// inventory update in admin

inventoryUpdate(orderdetails: Order): Observable<Order>  {
  const cartUrl = 'inventory/';
  const url: string = this.mainServiceUrl + cartUrl;
  return this.httpClient.post<Order>(url, orderdetails);
}

getCustomerOrderDetails(userId): Observable<Order> {
  const urlprofile = this.serviceUrl + 'orderdetails/' + userId;
  return this.httpClient.get<Order>(urlprofile);
}
}
