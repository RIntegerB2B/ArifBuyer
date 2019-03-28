import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../order-management.service';
import { Product } from '../../shared/model/product.model';
import {SingleProductOrder} from '../../shared/model/singleProductOrder.model';
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
  orderModel: SingleProductOrder;
  message;
  action;
  moqModel;
  changingQty;
  totalValue;
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
      pincode: [''],
      qty: [''],
      productPrice: ['']
    });
  }

  viewSingleProduct() {
    this.orderMgmtService.singleProduct(this.id).subscribe(data => {
      this.productModel = data;
      this.moq();
    }, err => {
      console.log(err);
    });
  }
  moq() {
    this.orderMgmtService.findMOQ(this.productModel.moq).subscribe(data => {
      this.moqModel = data;
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
    this.orderModel.total = product.price;
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
 /*    this.totalValue = +price * this.changingQty; */
  }
  increaseQty(qty, price) {
    this.changingQty = +qty + this.moqModel.moqQuantity;
    /* this.totalValue = +price * this.changingQty; */
  }
}
