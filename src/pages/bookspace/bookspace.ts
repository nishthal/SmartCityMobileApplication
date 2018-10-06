import { Component,ViewChild,ElementRef ,NgZone, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


import { location } from '../../models/location';
import {Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { FormControl } from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import { SetLocationPage } from '../set-location/set-location';
import { parkinglot } from '../../models/parkinglot';
import { parkinglotService } from '../../app/services/parkinglot';
import { BookPage } from '../book/book';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { onstreet } from '../../models/onstreet';
//import { NgZone } from '@angular/core/src/zone/ng_zone';
//import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-bookspace',
  templateUrl: 'bookspace.html',
})
export class BookspacePage implements OnInit {
  labelOptions = {
    color: '#00FF00',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'My Location',
    }
    labelOptions2 = {
      color: 'blue',
      fontFamily: '',
      fontSize: '14px',
      fontWeight: 'bold',
      text: 'OS',
      }
      labelOptions3 = {
        color: 'Pink',
        fontFamily: '',
        fontSize: '14px',
        fontWeight: 'bold',
        text: 'OS',
        }
   str ?:string ='L';
   public label1 ?: string='F';
   public label2 ?: string='E';
   image: any;
  zoom:number;
   @ViewChild("search")
   public searchElementRef;
   location: location={
    latitude :30.7624324,
    longitude:76.975982
  };
  parkings:parkinglot[];/*=[
    {
      longitude: 76.112345
        , latitude: 30.123212
        ,location:'Thapar University'
        , city:'Patiala'
        , state:'Punjab'
        ,parkedusers : 3
        , isfull:false
        , price: 10
    },
    {
      longitude: 77.112345
        , latitude: 32.123212
        ,location:'Omaxe Mall'
        , city:'Patiala'
        , state:'Punjab'
        ,parkedusers : 4
        , isfull:true
        , price: 15
    },
    
    ];*/
    onstreet:onstreet[];/*=[
      {
        longitude: 76.112321
          , latitude: 30.122111
          ,location:'Abc'
          , city:'Patiala'
          , state:'Punjab'
          ,parkedusers : 3
          , isfull:false
          , price: 10
      },
      {
        longitude: 79.112345
          , latitude: 31.123212
          ,location:'Omaxe Mall'
          , city:'Patiala'
          , state:'Punjab'
          ,parkedusers : 4
          , isfull:true
          , price: 15
      },
      
      ];*/
  locationIsSet= false ;
  setLocationPage:SetLocationPage;
  public searchControl: FormControl;
  public parkinglot :parkinglot[];
constructor(private modalCtrl: ModalController , private loadingCtrl :LoadingController, 
  private toastCtrl:ToastController ,private geo:Geolocation,private mapsAPILoader : MapsAPILoader, 
  private ngZone:NgZone, public parkinglotService: parkinglotService, public navCtrl:NavController ){
    this.zoom = 4;
    this.location.latitude = 39.8282;
    this.location.longitude = -98.5795;
    
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
  //  this.setCurrentPosition();
      
console.log(this.locationIsSet);
}
ngOnInit()
{
  this.image="C:\Users\NISHTHA\Projects-1\smartcityapp\src\assets\if_map-marker_299087.png";
  this.searchControl = new FormControl();
  this.parkinglotService.getLots().subscribe(  (data)=>{
    this.parkings = JSON.parse(JSON.stringify(data)) ; 
    console.log("In Parking");
    console.log(this.parkings);
  },
  (error)=>{console.log(error);}
);
this.parkinglotService.getSlots().subscribe(  (data)=>{
  this.onstreet = JSON.parse(JSON.stringify(data)) ; 
  console.log("In onstreet");
  console.log(this.onstreet);
},
(error)=>{console.log(error);}
);

  //set current position
  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
  let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
  let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
    types: ["address"]
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        
        //set latitude, longitude and zoom
        this.locationIsSet=true;
        this.location.latitude = place.geometry.location.lat();
        this.location.longitude = place.geometry.location.lng();
        this.zoom = 12;
        console.log(this.location);
        return;
      });
  });
  });
}
  
  
  book(park:parkinglot,index: number)
  {
      this.navCtrl.push(BookPage,{park,index});
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

private setCurrentPosition() {
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
      this.zoom = 12;
  });
  }
  }
ionViewDidLoad() {
//set google maps defaults

//create search FormControl

}
onOpenMap(){
  const modal=this.modalCtrl.create(SetLocationPage,{location : this.location,isSet: this.locationIsSet});
  modal.present();
  modal.onDidDismiss(
  data => {
    if(data)  {
      console.log("hey there");
      console.log(data);
      this.location = data.location;
      this.locationIsSet=true;
    }
  }
  
    
  );
  }

}
