import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {
  product = ['./../../../assets/images/cat1.jpg',
   './../../../assets/images/cat2.jpg', './../../../assets/images/cat3.png',
   './../../../assets/images/cat3.png'];
  constructor() { }

  ngOnInit() {
  }

}
