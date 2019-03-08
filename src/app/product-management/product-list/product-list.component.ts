import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {Filter} from './filter.model';

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
  priceRangeValue = ['250-500', '500-1000', '1000-1500', '1500-2000'];
  filterPrice;
  filterColor;
  filterMaterial;
  color = ['Black', 'Blue', 'Yellow', 'Red'];
  material = ['Polyster', 'Leather', 'Rexin'];
  sortBy = [{
      type: 'lowtohigh',
      value: 'Price - Low To High'
    }, {
      type: 'hightolow',
      value: 'Price -  High To Low'
    }];
  selectedSortVal;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  filterModel: Filter;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.filterPrice = localStorage.getItem('filterPrice');
    this.filterColor = localStorage.getItem('filterColor');
    this.filterMaterial = localStorage.getItem('filterMaterial');
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

  // filter

  showPriceOptions(val) {
    localStorage.setItem('filterPrice', val);
    this.filterModel = new Filter();
    const PriceVal = val;
    const splittedVal = PriceVal.split('-');
    console.log(typeof(splittedVal[0]));
    this.filterModel.minimumPriceFilter = +splittedVal[0];
    this.filterModel.maximumPriceFilter = +splittedVal[1];
 // tslint:disable-next-line:align
 this.productService.filterByPrice(this.catid, this.filterModel).subscribe(data => {
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
  showColorOptions(val) {
    localStorage.setItem('filterColor', val);
    this.filterModel = new Filter();
    this.filterModel.colorFilter = val;
    this.filterModel.materialFilter = localStorage.getItem('filterMaterial');
 // tslint:disable-next-line:align
  this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
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
  showMaterialOptions(val) {
    localStorage.setItem('filterMaterial', val);
    this.filterModel = new Filter();
    this.filterModel.colorFilter = localStorage.getItem('filterColor');
    this.filterModel.materialFilter = val ;
 // tslint:disable-next-line:align
  this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
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

}
