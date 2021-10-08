import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from './../logging.service';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private idChangeSub!: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.idChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  ingredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
