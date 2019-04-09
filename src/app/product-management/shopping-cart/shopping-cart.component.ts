import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from './../../shared/model/cart.model';
import { initNgModule } from '@angular/core/src/view/ng_module';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: any = [];
  cart: Cart;
  userId;
  constructor(private productService: ProductService) { }

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
          item.qty--;
          if (item.qty === 0) {
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
          item.qty++;
          item.subTotal = item.price * item.qty;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          break;
        case 'min':
          item.qty--;
          item.subTotal = item.price * item.qty;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          if (item.qty === 0) {
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
      subTotal: product.price * 1,
      qty: 1
    };
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.product = item;
    this.productService.addToCart(this.cart).subscribe(data => {
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
        sum += item.qty * item.price;
      });
      this.totalQty();
      return sum;
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.qty * item.price;
      });
      return sum;
    }
  }
  totalQty() {
    let qty = 0;
    this.shopModel.map(item => {
      qty += item.qty;
    });
    JSON.parse(sessionStorage.getItem('qty'));
    return qty;
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
      qty: 1
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
}
