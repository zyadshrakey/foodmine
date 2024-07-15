import { CartItem } from './Cartitem';

export class Cart {
  [x: string]: any;
  items: CartItem[] = [];

  get totalPrice(): number {
    let totalPrice = 0;
    this.items.forEach((item) => {
      totalPrice += item.price;
    });

    return totalPrice;
  }
}
