import { Component, OnInit } from '@angular/core';
import {  ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productModel: Product;
  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
