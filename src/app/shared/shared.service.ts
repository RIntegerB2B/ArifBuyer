import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { SuperCategory } from './model/superCategory.model';
import { Footer } from './footer/footer.model';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  serviceUrl: string = AppSetting.serviceUrl;
  mainServiceUrl: string = AppSetting.mainServiceUrl;
  constructor(private httpClient: HttpClient) { }

  getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.mainServiceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  getHeaderDetails(): Observable<any> {
    const categoryUrl = 'headerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  addToQty() {
    let sum = 0;
    if (JSON.parse(sessionStorage.getItem('login'))) {
      return JSON.parse(sessionStorage.getItem('cartLength'));
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.length;
      });
      return cart.length;
    }

  }
  getLogin() {
    return JSON.parse(sessionStorage.getItem('login'));
  }
  sessionLogout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmailId');
    sessionStorage.setItem('login', 'false');
    sessionStorage.removeItem('cartLength');

  }
  findName() {
    return sessionStorage.getItem('userEmailId');
  }
}

