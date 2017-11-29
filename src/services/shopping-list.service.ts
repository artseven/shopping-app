import { AuthService } from './auth';
import { Http } from '@angular/http';
import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(
        private http: Http,
        private authSrv: AuthService
    ) {}

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        // deconstruct this array into individual elements and push it to existing array
        // ES6 operator ------ |
        this.ingredients.push(...items);
    }

    getItems() {
        // to create a copy of array| instead of referencing to original one
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authSrv.getActiveUser().uid;
        return this.http
        .put('https://ionic3-recipesbook.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
        .map((response) => {
            return response.json();
        });
    }

    fetchList(token: String) {
        const userId = this.authSrv.getActiveUser().uid;
        return this.http
        .get('https://ionic3-recipesbook.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
        .map((response) => {
            return response.json();
        })
        .do((ingredients: Ingredient[]) => {
          if (ingredients) {
            this.ingredients = ingredients;
          } else {
            this.ingredients = [];
          }
        });
    }
}
