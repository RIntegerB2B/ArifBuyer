import { Component, OnInit, Input } from '@angular/core';
import { Banner } from './banner.model';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() banner: Banner;
  constructor() { }

  ngOnInit() {

  }
}
