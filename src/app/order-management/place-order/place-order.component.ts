import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
orderForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
createForm() {
  this.orderForm = this.fb.group({
firstName: [''],
lastName: [''],
streetAddress: [''],
building: [''],
landmark: [''],
city: [''],
state: [''],
pincode: ['']
  });
}
}
