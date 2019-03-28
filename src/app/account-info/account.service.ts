import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { regModel } from './registration/registration.model';
import { cardDeatailModel } from './card-details/cardDetails.model';
import { addressModel } from './address/address.model';
import { profileModel } from './profile/profile.model';
import { SignIn } from './signin/signIn.model';
import { AppSetting } from './../config/appSetting';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseurl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  getregForm(holder): Observable<regModel> {
    const urlway = this.baseurl + 'registration';
    return this.http.post<regModel>(urlway, holder);
  }

  getcardDetails(cardHolder, x): Observable<cardDeatailModel> {
    const urlcard = this.baseurl + 'cardupdate/' + x/* cardHolder._id */;
    return this.http.put<cardDeatailModel>(urlcard, cardHolder);
  }
  getaddressDetails(addressHolder, x): Observable<addressModel> {
    const urladdress = this.baseurl + 'addressupdate/' + x/* addressHolder._id */;
    return this.http.put<addressModel>(urladdress, addressHolder);
  }


  getprofileDetails(profileHolder, x): Observable<profileModel> {
    const urlprofile = this.baseurl + 'profileupdate/' + x/* profileHolder._id */;
    return this.http.put<profileModel>(urlprofile, profileHolder);
  }


  signIn(data: SignIn): Observable<any> {
    const signInurl = 'admin/validate';
    const url: string = this.baseurl + signInurl;
    return this.http.post<SignIn>(url, data);
  }
}


