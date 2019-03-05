import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './banner/banner.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { StripComponent } from './strip/strip.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { AdsComponent } from './ads/ads.component';



@NgModule({
  declarations: [HomeComponent, BannerComponent, CategoryContentComponent, StripComponent, ProductContentComponent, AdsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
