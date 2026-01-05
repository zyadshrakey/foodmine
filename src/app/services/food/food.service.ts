import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/food';
import { Tag } from '../../shared/models/tag';
import { sample_foods, sample_tags } from '../../shared/data';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Observable<Food[]> {
    const foods = sample_foods.map((food) => ({
      ...food,
      favorite: this.isFavorite(food.id),
    }));
    return of(foods).pipe(delay(500));
  }

  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return of(
      this.getAllWithFavorites().filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).pipe(delay(500));
  }

  getAllTags(): Observable<Tag[]> {
    return of(sample_tags).pipe(delay(500));
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    const foods = this.getAllWithFavorites();
    return tag === 'All'
      ? of(foods).pipe(delay(500))
      : of(foods.filter((food) => food.tags?.includes(tag))).pipe(delay(500));
  }

  getFoodById(id: number): Observable<Food> {
    const food = sample_foods.find((food) => food.id == id)!;
    if (food) {
      food.favorite = this.isFavorite(food.id);
    }
    return of(food).pipe(delay(500));
  }

  // Favorites Logic
  private getFavoritesFromLocalStorage(): number[] {
    const favoritesJson = localStorage.getItem('Favorites');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  private isFavorite(foodId: number): boolean {
    const favorites = this.getFavoritesFromLocalStorage();
    return favorites.includes(foodId);
  }

  toggleFavorite(foodId: number): void {
    let favorites = this.getFavoritesFromLocalStorage();
    if (favorites.includes(foodId)) {
      favorites = favorites.filter((id) => id !== foodId);
    } else {
      favorites.push(foodId);
    }
    localStorage.setItem('Favorites', JSON.stringify(favorites));
  }

  private getAllWithFavorites(): Food[] {
    return sample_foods.map((food) => ({
      ...food,
      favorite: this.isFavorite(food.id),
    }));
  }
}
