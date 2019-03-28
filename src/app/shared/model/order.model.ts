import {Product} from './product.model';

export class Order {
   customerId: string;
   products: [Product];
total: number;
}
