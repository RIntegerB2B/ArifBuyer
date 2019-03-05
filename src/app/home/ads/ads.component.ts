import { Component, OnInit, Input } from '@angular/core';
import { Ads } from './ads.model';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  @Input() adsData: Ads;
  constructor() { }

  ngOnInit() {
  }

}
