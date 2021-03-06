import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../account.service';
import { Order } from './../../../shared/model/order.model';
import {Product} from './../../../shared/model/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: string;
  order: Order;
  productModel: Product;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getCards();
    this.getProducts();
  }

  getCards() {
    this.userId = sessionStorage.getItem('userId');
    this.accountService.getCustomerOrderDetails(this.userId).subscribe(data => {
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
