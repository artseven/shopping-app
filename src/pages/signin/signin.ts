import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(
    private authService: AuthService
  ) {}

  onSignin(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
      }) 
      .catch(error => {
        console.log(error);
      })
  }

}
