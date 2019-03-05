import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { CategoryComponent } from './category/category.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
