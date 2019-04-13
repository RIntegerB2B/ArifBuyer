import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegModel } from './registration/registration.model';
import { CardDetailModel } from './card-details/cardDetails.model';
import { AddressModel } from './address/address.model';
import { ProfileModel } from './profile/profile.model';
import { SignIn } from './signin/signIn.model';
import { AppSetting } from './../config/appSetting';
import { Observable, from } from 'rxjs';
import { Product } from './../shared/product.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  getregForm(holder): Observable<RegModel> {
    const urlway = this.serviceUrl + 'registration';
    return this.http.post<RegModel>(urlway, holder);
  }

  getcardDetails(cardHolder, userId): Observable<CardDetailModel> {
    const urlcard = this.serviceUrl + 'cardupdate/' + userId;
    return this.http.put<CardDetailModel>(urlcard, cardHolder);
  }
  getaddressDetails(addressHolder, userId): Observable<AddressModel> {
    const urladdress = this.serviceUrl + 'addressupdate/' + userId;
    return this.http.put<AddressModel>(urladdress, addressHolder);
  }


  getprofileDetails(profileHolder, userId): Observable<ProfileModel> {
    const urlprofile = this.serviceUrl + 'profileupdate/' + userId;
    return this.http.put<ProfileModel>(urlprofile, profileHolder);
  }


  signIn(data: SignIn): Observable<any> {
    const signInurl = 'admin/validate';
    const url: string = this.serviceUrl + signInurl;
    return this.http.post<SignIn>(url, data);
  }
  addToCart(cart): Observable<any> {
    const cartUrl = 'cart';
    const url: string = this.serviceUrl + cartUrl;
    return this.http.post<any>(url, cart);
  }
}


