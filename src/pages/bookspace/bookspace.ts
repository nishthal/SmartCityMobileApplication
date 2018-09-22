import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
//import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { location } from '../../models/location';
import {Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ViewChild } from '@angular/core';


//declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-bookspace',
  templateUrl: 'bookspace.html',
})

export class BookspacePage implements OnInit{
  location: location={
    latitude :40.7624324,
    longitude:-73.975982
  };
  
  @ViewChild('nav')  nav : NavController;
  locationIsSet= false ;
  mobile: number;
  token:string;
constructor(public navparams:NavParams ,private loadingCtrl :LoadingController, 
  private toastCtrl:ToastController ,private geo:Geolocation, private authService:AuthService){
console.log(this.locationIsSet);
}
ngOnInit(){
  this.mobile=this.navparams.get('mobile');
  this.token=this.navparams.get('token');
  //this.information();
}
information()
{
  /*this.authService.getInfo(this.mobile);/*.subscribe(data=>{
    console.log("GetInfo");
    console.log(data);
  },
error=>{
  console.log(error);
});*/

}
onLocate(){
  const loader = this.loadingCtrl.create({
content: 'Getting your location...'
  });
  loader.present();
  this.geo.getCurrentPosition()
  .then(
    
   // loader.dismiss();
    location =>{
      loader.dismiss();
      this.location.latitude=location.coords.latitude;
      this.location.longitude=location.coords.longitude;
      this.locationIsSet =true;
    }
  )
  .catch(
    
    error =>{
      loader.dismiss();
      const toast =this.toastCtrl.create({
        message: ' Could not get Location ',
        duration: 2500
      });
      toast.present();
      console.log(error);    
    }
  )
}


}
