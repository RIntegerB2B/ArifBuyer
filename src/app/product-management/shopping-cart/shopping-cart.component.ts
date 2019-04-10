import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from './../../shared/model/cart.model';
import { initNgModule } from '@angular/core/src/view/ng_module';
import {MOQ} from '../../shared/model/moq.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: any = [];
  cart: Cart;
  userId;
  moqModel: MOQ;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.userId = sessionStorage.getItem('userId');
      this.shoppingCartUser(this.userId);
    } else {
      this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
    }
  }
  action(event, item) {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      switch (event) {
        case 'add':
          this.addToCartServer(this.userId, item);
          break;
        case 'min':
          item.set--;
          if (item.set === 0) {
            this.removeCart(this.userId, item);
          } else {
            this.minusCart(this.userId, item);
          }
          break;
        case 'clear':
          this.removeCart(this.userId, item);
          break;
        default:
          break;
      }
    } else {
      switch (event) {
        case 'add':
          item.set++;
          item.subTotal = item.price * item.set;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          break;
        case 'min':
          item.set--;
          item.subTotal = item.price * item.set;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          if (item.set === 0) {
            this.clearFromCart(item);
          }
          break;
        case 'clear':
          this.clearFromCart(item);
          break;
        default:
          break;
      }
    }
  }
  addToCartServer(userId, product) {
    const item = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName,
       price: product.price,
     /* subTotal: product.price * 1, */
      set: 1
    };
    const totalItem = [];
    totalItem.push(item);
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.product = totalItem;
    this.productService.addToCart(this.cart).subscribe(data => {
      console.log('incremented count', data);
      this.shopModel = data;
    }, error => {
      console.log(error);
    });
  }
  clearFromCart(product) {
    const item = this.shopModel.find(ite => {
      return ite.productId === product.productId;
    });
    const index = this.shopModel.indexOf(item);
    this.shopModel.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
  }
  total() {
    let sum = 0;

    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.shopModel.map(item => {
        sum += item.set * item.moq * item.price;
      });
      this.totalQty();
      return sum;
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.set * item.moq * item.price;
      });
      return sum;
    }
  }
  totalQty() {
    let set = 0;
    this.shopModel.map(item => {
      set += item.set;
    });
    JSON.parse(sessionStorage.getItem('set'));
    return set;
  }
  shoppingCartUser(userId) {
    this.productService.shoppingUser(userId).subscribe(data => {
      this.shopModel = data;
      console.log(this.shopModel);
    }, err => {
      console.log(err);
    });
  }

  minusCart(userId, product) {
    const item = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName,
      price: product.price,
      subTotal: product.price * 1,
      set: 1
    };
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.product = item;
    this.productService.addToCartMinus(this.cart).subscribe(data => {
      this.shopModel = data;
    }, err => {
      console.log(err);
    });
  }
  /*   reduceCart(proId) {
     this.productService.reduceToCart(proId).subscribe(data => {
       this.shopModel = data;
       localStorage.setItem('cart', JSON.stringify(data));
     }, err => {
       console.log(err);
     });
   }*/
  removeCart(userid, item) {
    this.productService.deleteToCart(userid, item).subscribe(data => {
      this.shopModel = data;
    }, err => {
      console.log(err);
    });
  }
  placeOrder() {
    this.router.navigate(['order/placeorder']);
  }
}
