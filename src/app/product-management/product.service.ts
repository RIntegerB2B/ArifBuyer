import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import { PublicService } from '../shared/public/publicService';

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
}
