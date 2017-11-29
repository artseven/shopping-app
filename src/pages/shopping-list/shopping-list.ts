import { AuthService } from '../../services/auth';
import { AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Ingredient } from './../../models/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options'
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
      private authSrv: AuthService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
        data => {
        if (data !== null && data.action == 'load') {
          loading.present();
          this.authSrv.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.fetchList(token)
                .subscribe(
                  (list: Ingredient[])=> {
                    loading.dismiss();
                    if (list) {
                      this.listItems = list;
                    } else {
                      this.listItems = [];
                    }
                  },
                  error => {
                    loading.dismiss();
                    this.handleError(error.json().error)
                  }
                )
            }
          );
        } else if (data.action == 'store') {
          loading.present();
          this.authSrv.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.storeList(token)
                .subscribe(
                  ()=> loading.dismiss(),
                  error => {
                    loading.dismiss();
                    this.handleError(error.json().error);
                  }
                )
            }
          );
        }
      }
    )
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
  }




}
