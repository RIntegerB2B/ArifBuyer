import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productModel: any;
  id;
  showRelatedProducts;
  productId;
  relatedProducts = [];
  primeHide: boolean;
  showImages: boolean;
  selectedSmallImg: any;
  selectedImg;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewSingleProduct();
  }
viewSingleProduct() {
  this.productService.singleProduct(this.id).subscribe( data => {
    console.log('single product', data);
    this.productModel = data;
    if (data.styleCode === '' || data.styleCode === undefined || data.styleCode === null) {
        this.showRelatedProducts = false;
        this.productModel = data;
      } else {
        this.showRelatedProducts = true;
        this.productService.getRelatedProducts(data).subscribe(relatedProductData => {
          console.log('related products', relatedProductData);
          relatedProductData.forEach(element => {
            if (element._id !== this.id) {
              this.relatedProducts.push(element);
            }
          });
          this.productModel = relatedProductData.find(e => e._id === this.id);
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    });
}
clickImg(data) {
  this.primeHide = true;
  this.showImages = true;
  this.selectedSmallImg = data;
  this.selectedImg = data;
}
relatedProduct(element) {
  this.relatedProducts.push(this.productModel);
  this.productModel = element;
  this.primeHide = false;
  this.showImages = false;
  const index = this.relatedProducts.indexOf(element);
  if (index !== -1) {
    this.relatedProducts.splice(index, 1);
  }
}
}
