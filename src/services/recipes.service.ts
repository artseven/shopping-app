import { AuthService } from './auth';
import { Http } from '@angular/http';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) {}

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
      this.recipes.push(new Recipe(title, description, difficulty, ingredients));
      console.log(this.recipes);
  }

  getRecipes() {
      return this.recipes.slice();
  }

  updateRecipe(index: number,
                title: string,
                description: string,
                difficulty: string,
                ingredients: Ingredient[]) {
      this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }


  removeRecipe(index: number) {
      this.recipes.splice(index, )
  }

  storeList(token: string) {
    const userId = this.authSrv.getActiveUser().uid;
    return this.http.put('https://ionic3-recipesbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
  }


  fetchList(token: string) {
    const userId = this.authSrv.getActiveUser().uid;
    return this.http.get('https://ionic3-recipesbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
  }


}
