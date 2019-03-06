import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable,  } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productModel: Product;
  productModel$: Observable<string>;
  catid: string;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.productModel$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catid = params.get('catId');
        this.viewCategory();
        return this.catid;
      })
    );
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
  viewCategory() {
    this.productService.getViewCategory(this.catid).subscribe(data => {
      this.productModel = data;
      console.log(this.productModel);
    }, error => {
      console.log(error);
    });
  }
}
