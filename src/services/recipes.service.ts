import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';

export class RecipesService {
    private recipes: Recipe[] = [];

    addRecipe(title: string,
              description: string,
              difficulty: string, 
              ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    getRecipes() {
        return this.recipes.slice();
    }
}