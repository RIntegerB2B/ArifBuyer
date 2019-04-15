import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { SuperCategory } from './../model/superCategory.model';
import { Product } from './../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  navbarShow = false;
  superCategory: SuperCategory[];
  product: Product[];
  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selected: any;
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.getSuperCategory();
  }
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
    /* this.dropdownShow = !this.dropdownShow; */
  }
  getSuperCategory() {
    this.sharedService.getSuperCategory().subscribe(data => {
      this.superCategory = data;
      console.log(data);
    });
  }
  toggleDropdown(cat) {
    this.superCategory.forEach(element => {
      if (element._id !== cat._id) {
        cat.editing = false;
         /* this.dropdownShow = !this.dropdownShow; */
      } else {
        cat.editing = true;
        this.dropdownShow = !this.dropdownShow;
        this.selectedDropDown = element._id;
        this.selected = cat;
      }
    });
    /* for (let i = 0; i <= this.superCategory.length; i++ )     {
      if (this.superCategory[i]._id === cat._id )       {
        cat.editing = true;
        this.dropdownShow = true;
      }
    } */
  }
  viewCategory(subcat)   {
    this.selectedDropDown = '';
    localStorage.removeItem('productSortType');
    localStorage.removeItem('filterPrice');
    localStorage.removeItem('filterColor');
    localStorage.removeItem('filterMaterial');
    this.router.navigate(['/product/productlist', subcat]);
  }
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
}
