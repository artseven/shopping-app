import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  //injecting service to get access to its functions
  constructor(
      private slService: ShoppingListService
     ) {}

  onAddItem(form: NgForm) {
    // passing NgForm and it's values into function
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
  }
}
