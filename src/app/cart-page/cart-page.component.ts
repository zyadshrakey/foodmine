import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/Cartitem';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartServices: CartService) {}
  ngOnInit(): void {
    this.cartServices.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartServices.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantity: number) {
    this.cartServices.changeQuantity(cartItem.food.id, quantity);
  }
}
