import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { SuperCategory } from './../model/superCategory.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  navbarShow = false;
  superCategory: SuperCategory[];
  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selected: any;
  constructor(private sharedService: SharedService) { }

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
    });
  }
  toggleDropdown(cat) {
    this.superCategory.forEach(element => {
      if (element._id !== cat._id) {
        cat.editing = false;
      } else {
        cat.editing = true;
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
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
}
