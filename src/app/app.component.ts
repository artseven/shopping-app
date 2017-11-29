import { AuthService } from '../services/auth';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  firebase from 'firebase';
import { TabsPage } from './../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    platform.ready().then(() => {
      firebase.initializeApp({
          apiKey: "AIzaSyBrD8mO-WLn-fhnROXjGoX2yICPtUPUFCs",
          authDomain: "ionic3-recipesbook.firebaseapp.com"
      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
          this.nav.setRoot(this.tabsPage);
        } else {
          this.isAuthenticated = false;
          this.nav.setRoot(this.signinPage);
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}

