import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})

export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup; 

  constructor(private navParams: NavParams,
   private actionSheetController: ActionSheetController,
   private alertController: AlertController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {

          }

        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }
  
  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            //matches first input name
            if (data.name.trim() === '' || data.name == null) {
              console.log('WRONG!');
            }
          }
        }
      ]
    })
  }
  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    });
  }

}
