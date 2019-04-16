import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../account.service';
import { Order } from './../../../shared/model/order.model';
import {Product} from './../../../shared/model/product.model';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-view-single-order',
  templateUrl: './view-single-order.component.html',
  styleUrls: ['./view-single-order.component.css']
})
export class ViewSingleOrderComponent implements OnInit {
  userId: string;
  order: Order;
  productModel: Product;
  orderId;
  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.id;
    this.getCards();
    this.getProducts();

  }
  getCards() {
    this.userId = sessionStorage.getItem('userId');
    this.accountService.getCustomerSingleOrderDetails(this.userId, this.orderId).subscribe(data => {
    this.order = data;
    }, error => {
      console.log(error);
    });
  }
  getProducts() {
    this.accountService.getProducts().subscribe(data => {
      this.productModel = data;
      console.log('products', data);
    }, err => {
      console.log(err);
    });
  }
}
