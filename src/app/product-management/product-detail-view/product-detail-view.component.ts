import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit {
  productData: Product;
  details: boolean;
  @Input() productModel: Product;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }
  showDetails() {
this.details = true;
  }
  buySingleProducts(id) {
    console.log(id, 'single products');
    this.router.navigate(['order/placeorder', id]);
  }
}
