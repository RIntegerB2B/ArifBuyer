import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { from } from 'rxjs';
const routes: Routes = [{ path: 'registration', component: RegistrationComponent },
{ path: 'card', component: CardDetailsComponent },
{ path: 'address', component: AddressComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule { }
