import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  
  onAddItem(form: NgForm) {
    console.log(form);
  }
}
