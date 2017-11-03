import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    onSignup(form: NgForm) {
      console.log(form.value);
    }
}
