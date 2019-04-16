import { Component, OnInit } from '@angular/core';
import { Banner } from './../banner/banner.model';
import { HomeService } from './../home.service';
import { Ads } from './../ads/ads.model';
import { Promotion } from './../promotion/promotion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner: Banner[];
  slideIndex = 0;
  adsData: Ads;
  promotion: Promotion;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.allBanner();
    this.allAds();
    this.allPromotion();
  }
  allBanner() {
    this.homeService.getAllBanner().subscribe(data => {
      this.banner = data;
      console.log(this.banner);
    }, error => {
      console.log(error);
    });
  }
  allAds() {
    this.homeService.getAllAds().subscribe(data => {
      this.adsData = data;
    }, error => {
      console.log(error);
    });
  }
  allPromotion() {
    this.homeService.getAllPromotion().subscribe(data => {
      this.promotion = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  minusSlides(n) {
    const min = --n;
    if (min < 0) {
      this.slideIndex = this.banner.length - 1;
    } else {
      this.slideIndex = min;
    }
  }
  plusSlides(n) {
    if (this.banner.length - 1 < n || this.banner.length - 1 <= n) {
      this.slideIndex = 0;
    } else {
      this.slideIndex = ++n;
    }
  }
}
