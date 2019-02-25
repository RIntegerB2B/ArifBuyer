import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from './../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string = AppSetting.serviceUrl;
  cartCount = 0;
  a: Product[] = [];

  constructor(private httpClient: HttpClient) {

  }

  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }
  addToCart(product: Product) {
    this.a = JSON.parse(localStorage.getItem('product')) || [];
    this.a.push(product);
    localStorage.setItem('product', JSON.stringify(this.a));
    this.calculateLocalCartProdCounts();
  }
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('product')) || [];

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === product._id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem('product', JSON.stringify(products));

    this.calculateLocalCartProdCounts();
  }
  findCart() {
    const categoryUrl = 'findcart';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem('product'));
    return products;
  }
  calculateLocalCartProdCounts() {
    this.cartCount = this.getLocalCartProducts().length;
  }
}
