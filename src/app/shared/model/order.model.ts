import {Product} from './product.model';

export class Order {
   customerId: string;
   products: [{
      productId: string,
   qty: number}];
total: number;
}
