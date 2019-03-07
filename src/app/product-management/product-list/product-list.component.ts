import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productModel: any;
  productModel$: Observable<string>;
  catid: string;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  sortBy = [
    {
      type: 'lowtohigh',
      value: 'Price - Low To High'
    },
    {
      type: 'hightolow',
      value: 'Price -  High To Low'
    }];
    selectedSortVal;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.productModel$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catid = params.get('catId');
        this.viewCategory();
        this.onLoadSortType();
        return this.catid;
      })
    );
    /* this.getProducts(); */

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
  lowToHigh() {
    this.productService.lowPriceCategory(this.catid).subscribe(data => {
      this.productModel = data;
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  onLoadSortType() {
    const val = localStorage.getItem('productSortType');
    this.sortType(val);
  }
  sortType(val) {
    this.selectedSortVal = val;
    localStorage.setItem('productSortType', val);
    if (val === 'lowtohigh') {
      this.lowToHigh();
    } else if (val === 'hightolow') {
      this.highToLow();
    }
  }
  highToLow() {
    this.productService.highPriceCategory(this.catid).subscribe(data => {
      this.productModel = data;
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  viewCategory() {
    this.productService.getViewCategory(this.catid).subscribe(data => {
      this.productModel = data;
      /* this.productModel = new MatTableDataSource<Product>(data); */
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    console.log('paginator', e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productModel = part;
  }
}
