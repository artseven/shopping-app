import { AuthService } from '../../services/auth';
import { RecipesOptionsPage } from './recipes-options/recipes-options';
import { RecipePage } from '../recipe/recipe';
import { RecipesService } from './../../services/recipes.service';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { LoadingController, NavController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];
  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private authSrv: AuthService
  ) {
  }

  ionViewWillEnter(){
     this.recipes = this.recipesService.getRecipes();
  }


  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});

  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data=> {
        if (data.action == 'load') {
          loading.present();
          this.authSrv
        }
      })
  }

}
