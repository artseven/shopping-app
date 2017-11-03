import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { IonicPage,
   LoadingController, 
   NavController, 
   NavParams,
   AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

    onSignup(form: NgForm) {
      const loading = this.loadingCtrl.create({
        content: 'Signing you up...'
      });
      loading.present();
      this.authService.signup(form.value.email, form.value.password)
        .then(data => {
          loading.dismiss();
        })
        .catch(error =>{
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signup failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        });
    }
}
