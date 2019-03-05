import { Component, OnInit } from '@angular/core';
import { Banner } from './../banner/banner.model';
import { HomeService } from './../home.service';
import { Ads } from './../ads/ads.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner: Banner;
  adsData: Ads;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.allBanner();
    this.allAds();
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
}
