import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
})
export class FavoritesPageComponent implements OnInit {
  favorites: Food[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.foodService.getAll().subscribe((foods) => {
      this.favorites = foods.filter((food) => food.favorite);
    });
  }

  removeFromFavorites(food: Food) {
    this.foodService.toggleFavorite(food.id);
    this.loadFavorites(); // Reload to remove from list
  }
}
