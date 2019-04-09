import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { addressModel } from './address.model';





@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressHolder: addressModel;
  addressForm: FormGroup;
  states = ['TN', 'UP', 'AP', 'KL', 'KA', 'MH', 'CH', 'JK', 'UK', 'FM', 'PONDI', 'GJ', 'JK'];
  address = ['houseno', 'building', 'street', 'area', 'landmark']
  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.addressDetails();
  }

  addressDetails() {
    this.addressForm = this.fb.group({
      name: [''],
      mobileNumber: [''],
      pincode: [''],
      city: [''],
      state: [''],
      address: this.fb.group({
        houseno: [''],
        building: [''],
        street: [''],
        area: [''],
        landmark: ['']
      })

    });

  }



  onSubmit() {
    this.addressHolder = new addressModel();
    this.addressHolder.name = this.addressForm.controls.name.value;
    this.addressHolder.mobileNumber = this.addressForm.controls.mobileNumber.value;
    this.addressHolder.pincode = this.addressForm.controls.pincode.value;
    this.addressHolder.city = this.addressForm.controls.city.value;
    this.addressHolder.state = this.addressForm.controls.state.value;
    this.addressHolder.address = this.addressForm.controls.address.value;
    this.accountService.getaddressDetails(this.addressHolder).subscribe(data => {
      this.addressHolder = data;
      this.addressHolder = data;
    }, error => {
      console.log(error);
    }
    );
    /* console.log(this.regForm); */


  }
  getReset() {
    this.addressForm.reset();
  }



}
