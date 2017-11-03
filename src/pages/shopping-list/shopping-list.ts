import { AuthService } from '../../services/auth';
import { SLOptionsPage } from './sl-options/sl-options';
import { PopoverController } from 'ionic-angular';
import { Ingredient } from './../../models/ingredient';

import { ShoppingListService } from './../../services/shopping-list.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];
  //injecting service to get access to its functions
  constructor(
      private slService: ShoppingListService,
      private popoverCtrl: PopoverController,
      private authSrv: AuthService
     ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    // passing NgForm and it's values into function
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems()
  }
// changes
  onDeleteItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {
          this.authSrv.getActiveUser().getToken()
            .then(
              (token: string) => {
                
              }
            );
        } else {

        }
      }
    )
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }




}
