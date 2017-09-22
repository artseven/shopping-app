import { Ingredient } from '../models/ingredient';

export class ShoppingListService {
    private ingredients: Ingredient[] = [];


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
}