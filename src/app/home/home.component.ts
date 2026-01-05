import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params['searchTerm'])
      let foodsObservable: Observable<Food[]>;
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      } else if (params['tag']) {
        foodsObservable = this.foodService.getAllFoodByTag(params['tag']);
      } else {
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  toggleFavorite(food: Food, event: Event): void {
    event.stopPropagation();
    this.foodService.toggleFavorite(food.id);
    food.favorite = !food.favorite;
  }
}
