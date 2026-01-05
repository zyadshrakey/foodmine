import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        foodService.getFoodById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
        });
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.router.navigateByUrl('/cart-page');
    this.cartService.addToCart(this.food);
    // console.log(this.cartService.getCart())
  }
  toggleFavorite() {
    this.foodService.toggleFavorite(this.food.id);
    this.food.favorite = !this.food.favorite;
  }
}
