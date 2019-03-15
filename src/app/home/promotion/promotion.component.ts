import { Component, OnInit, Input } from '@angular/core';
import { Promotion } from './promotion.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  @Input () promotion: Promotion;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  productView(data) {
    this.router.navigate(['/product/productview', data._id]);
  }
}
