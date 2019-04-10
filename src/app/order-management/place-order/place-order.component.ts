import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../order-management.service';
import { Product } from '../../shared/model/product.model';
import {SingleProductOrder} from '../../shared/model/singleProductOrder.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  id;
  productModel: Product;
  orderModel: SingleProductOrder;
  message;
  action;
  moqModel;
  changingQty;
  totalValue;
  calculatedPrice;
  loginStatus;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private orderMgmtService: OrderManagementService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.createForm();
    /* this.viewSingleProduct(); */
    this.loginStatus = sessionStorage.getItem('login');
    if (this.loginStatus !== 'true') {
      this.router.navigate(['account/signin']);
    }
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
      pincode: [''],
      qty: [''],
      productPrice: ['']
    });
  }

  viewSingleProduct() {
    this.orderMgmtService.singleProduct(this.id).subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }

  placeOrder(product, qty) {
    console.log(this.orderForm.controls.qty.value);
    this.message = 'Order Placed  successfully';
    this.orderModel = new SingleProductOrder();
    this.orderModel.productId = product.productId;
    this.orderModel.price = product.price;
    this.orderModel.qty = +qty;
    this.orderModel.total = this.calculatedPrice;
    this.orderMgmtService.placeOrder(this.orderModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
  }, err => {
    console.log(err);
  });
  }
  reduceQty(qty, price) {
    this.changingQty = +qty - this.moqModel.moqQuantity;
    this.calculatedPrice = +price * this.changingQty;
  }
  increaseQty(qty, price) {
    this.changingQty = +qty + this.moqModel.moqQuantity;
    this.calculatedPrice = +price * this.changingQty;
  }
}
