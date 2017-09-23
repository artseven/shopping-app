import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController) {
  }


  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

}
