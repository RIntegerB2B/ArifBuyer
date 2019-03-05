import { Component, OnInit } from '@angular/core';
import {} from './supeCategory.model';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {
  category = ['./../../../assets/images/cat1.jpg',
   './../../../assets/images/cat2.jpg', './../../../assets/images/cat3.png',
   './../../../assets/images/cat3.png'];
  constructor() { }

  ngOnInit() {
  }

}
