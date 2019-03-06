import { Component, OnInit, Input } from '@angular/core';
import { Promotion } from './promotion.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  @Input () promotion: Promotion;
  constructor() { }

  ngOnInit() {
  }

}
