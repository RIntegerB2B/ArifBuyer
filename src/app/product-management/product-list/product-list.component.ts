import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Filter } from './filter.model';
import {ProductSettings} from './../../shared/model/productFilter.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productModel: any;
  productSettingsModel: ProductSettings;
  productModel$: Observable<string>;
  catid: string;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  filterPrice;
  filterColor;
  filterMaterial;
  sortBy = [{
    type: 'lowtohigh',
    value: 'Price - Low To High'
  }, {
    type: 'hightolow',
    value: 'Price -  High To Low'
  }];
  selectedCheckBox;
  selectedMaterialCheckBox;
  selectedPriceCheckBox;
  selectedSortVal;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  filterModel: Filter;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    localStorage.removeItem('filterMaterial');
    localStorage.removeItem('minimumPriceFilter');
    localStorage.removeItem('maximumPriceFilter');
    localStorage.removeItem('filterColor');
    this.productModel$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catid = params.get('catId');
        this.viewCategory();
        this.onLoadSortType();
        return this.catid;
      })
    );
    this.getFilterMenu();
    /* this.getProducts(); */

  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  getFilterMenu() {
    this.productService.getFilterData().subscribe(data => {
      console.log('filter menu', data);
      this.productSettingsModel = data;
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
  viewSingleProduct(id) {
    this.router.navigate(['/product/productview', id]);
  }
  // filter by price

  showPriceOptions(e, i) {
    if (e.checked === true) {
      this.selectedPriceCheckBox = i;
      const PriceVal = e.source.value;
      const splittedVal = PriceVal.split('-');
      localStorage.setItem('minimumPriceFilter', splittedVal[0]);
      localStorage.setItem('maximumPriceFilter', splittedVal[1]);
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      this.filterModel = new Filter();
      this.filterModel.minimumPriceFilter = +splittedVal[0];
      this.filterModel.maximumPriceFilter = +splittedVal[1];
      this.filterModel.materialFilter = MaterialSelected;
      this.filterModel.colorFilter = ColorSelected;
      this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
        console.log('price filter data', data);
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('minimumPriceFilter');
      localStorage.removeItem('maximumPriceFilter');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      if ((MaterialSelected === null || MaterialSelected === undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) {  // filter only price
        this.viewCategory();
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
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
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined)) {  // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
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
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected !== null || MaterialSelected !== undefined)) {  // filter  color and material
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.filterModel.materialFilter = MaterialSelected;
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
  }
  // filter By color
  showColorOptions(e, i) {
    if (e.checked === true) {
      this.selectedCheckBox = i;
      localStorage.setItem('filterColor', e.source.value);
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      this.filterModel = new Filter();
      this.filterModel.colorFilter = e.source.value;
      if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.filterModel.materialFilter = localStorage.getItem('filterMaterial');
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
    } else if (e.checked === false) {
      localStorage.removeItem('filterColor');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      if ( (MinimumPriceSelected !== null && MinimumPriceSelected !== undefined ) &&
      ( MaximumPriceSelected !== undefined && MaximumPriceSelected !== null) ) {
       this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
       this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
     } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0'  ) &&
     ( MaximumPriceSelected === undefined && MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {
       this.filterModel.minimumPriceFilter = undefined;
       this.filterModel.maximumPriceFilter = undefined;
     }
      if ((MaterialSelected === null || MaterialSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) { // no filter
        this.viewCategory();
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined)) {  // filter material and price
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
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
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0' ) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined  || MaximumPriceSelected === '0')) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
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
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined)) {  // filter only price
        this.filterModel = new Filter();
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
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
  }
  showMaterialOptions(e, i) {
    if (e.checked === true) {
      this.selectedMaterialCheckBox = i;
      localStorage.setItem('filterMaterial', e.source.value);
      this.filterModel = new Filter();
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      this.filterModel.colorFilter = localStorage.getItem('filterColor');
      this.filterModel.materialFilter = e.source.value;
      if ( (MinimumPriceSelected !== null && MinimumPriceSelected !== undefined ) &&
       ( MaximumPriceSelected !== undefined && MaximumPriceSelected !== null) ) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined ) &&
      (MaximumPriceSelected === null || MaximumPriceSelected === undefined )) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
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
    } else if (e.checked === false) {
      localStorage.removeItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      if ( (MinimumPriceSelected !== null && MinimumPriceSelected !== undefined ) &&
       ( MinimumPriceSelected !== undefined && MaximumPriceSelected !== null) ) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined )) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((ColorSelected === null || ColorSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {  // no filter
        this.viewCategory();
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) { // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
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
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined ) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined ) &&
        (ColorSelected === null || ColorSelected === undefined)) { // filter only price
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
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
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
      (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
      (ColorSelected !== null || ColorSelected !== undefined)) { // filter price and color
      this.filterModel = new Filter();
      if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      }
      this.filterModel.colorFilter = ColorSelected;
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
  }
}
