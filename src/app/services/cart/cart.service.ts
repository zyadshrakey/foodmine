import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/Cartitem';
import { Food } from 'src/app/shared/models/food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(
      (item: { food: { id: number } }) => item.food.id === food.id
    );
    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(food));
    // console.log("food item added...")
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(
      (item: { food: { id: number } }) => item.food.id != foodId
    );
  }

  changeQuantity(foodId: number, quantity: number) {
    let cartItem = this.cart.items.find(
      (item: { food: { id: number } }) => item.food.id === foodId
    );
    if (!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }
}
