import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { BookspacePage } from '../pages/bookspace/bookspace';
import { DustbinPage } from '../pages/dustbin/dustbin';
;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any = SigninPage;
  signinPage =SigninPage;
  signupPage=SignupPage;
  bookspacePage=BookspacePage;
  dustbinPage=DustbinPage
 isAuthenticated=false;
  
 @ViewChild('nav')  nav : NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl: MenuController) {
  }

  onLoad(page: any){
this.nav.setRoot(page);
this.menuCtrl.close();

  }

  onLogout(){

this.menuCtrl.close();
this.nav.setRoot(SigninPage);
  }
}
