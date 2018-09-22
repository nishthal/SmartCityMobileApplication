import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import {CookieService} from 'angular2-cookie';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookspacePage } from '../pages/bookspace/bookspace';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { DustbinPage } from '../pages/dustbin/dustbin';
import { Geolocation } from '@ionic-native/geolocation';
//import { Storage } from '@ionic/storage';

import { AgmCoreModule } from '@agm/core';
import { SetLocationPage } from '../pages/set-location/set-location';
import { HttpClient } from '@angular/common/http/src/client';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { parkinglotService } from './services/parkinglot';
import { AuthService } from './services/auth';
import { AuthenService } from './services/authen';
import { dustbinService } from './services/dustbin';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BookspacePage,SigninPage,SignupPage,DustbinPage,SetLocationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBR0cRsyuF__UGFdx-Hseg0Ux9QOoXFKT4",
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BookspacePage,SigninPage,SignupPage,DustbinPage,SetLocationPage
  ],
  providers: [CookieService,Storage,AuthenService,
    StatusBar,
    SplashScreen,
    parkinglotService,
    AuthService,
    Geolocation,
    dustbinService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
