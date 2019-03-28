import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../order-management.service';
import { Product } from '../../shared/model/product.model';
import {Order} from '../../shared/model/order.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  id;
  productModel: Product;
  orderModel: Order;
  message;
  action;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private orderMgmtService: OrderManagementService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.id = this.route.snapshot.params.id;
    this.viewSingleProduct();
  }
  createForm() {
    this.orderForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailId: [''],
      streetAddress: [''],
      building: [''],
      landmark: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }

  viewSingleProduct() {
    this.orderMgmtService.singleProduct(this.id).subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  placeOrder(product) {
    this.message = 'Order Placed  successfully';
    this.orderModel = new Order();
    this.orderModel.products = product;
    this.orderMgmtService.placeOrder(this.orderModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      console.log(data);
  }, err => {
    console.log(err);
  });
  }
}
