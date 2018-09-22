import { Component,ViewChild,ElementRef ,NgZone, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


import { markersdec } from '../../models/markersdec';
import { location } from '../../models/location';
import {Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { FormControl } from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import { SetLocationPage } from '../set-location/set-location';
import { parkinglot } from '../../models/parkinglot';
import { parkinglotService } from '../../app/services/parkinglot';
import { dustbinService } from '../../app/services/dustbin';
import { dustbin } from '../../models/dustbin';
//import { NgZone } from '@angular/core/src/zone/ng_zone';
//import { ViewChild } from '@angular/core/src/metadata/di';
declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-dustbin',
  templateUrl: 'dustbin.html',
})
export class DustbinPage implements OnInit {
   str ?:string ='L';
  @ViewChild('search') public searchElement: ElementRef;
  location: location={
    latitude :30.7624324,
    longitude:76.975982
  };
  trash:markersdec[]=[
    {
      name: "The Sardar Patel Museum",
      latitude: 21.1699005,
      longitude: 72.7955734,
      draggable:false
    },
    {
      name: "ABC",
      latitude: 22.1699005,
      longitude: 73.7955734,
      draggable:true

    }
    ];
  locationIsSet= false ;
  setLocationPage:SetLocationPage;
  public searchControl: FormControl;
  parkinglot :parkinglot[];
  dustbins: dustbin[]; 
  mk:markersdec; 
constructor(private modalCtrl: ModalController , private loadingCtrl :LoadingController, 
  private toastCtrl:ToastController ,private geo:Geolocation,private mapsAPILoader : MapsAPILoader, 
  private ngZone:NgZone, public parkinglotService: parkinglotService , public dustbinService: dustbinService ){
  
console.log(this.locationIsSet);
}
ngOnInit()
{
  this.dustbinService.getDustbins().subscribe(  (data)=>{
    this.dustbins = JSON.parse(JSON.stringify(data)) ;

    for(let item of this.dustbins)
    {
       //console.log(item.id); 
        //console.log(item.location);
        //console.log(item.latitude);
        //console.log("item.id");
        //item.latitude=parseInt(item.latitude)
        if(item.isFull)
        this.mk={name : item.location , latitude : parseFloat(item.latitude) , longitude: parseFloat(item.longitude) , draggable: item.isFull,label:'F'};
        else
        this.mk={name : item.location , latitude : parseFloat(item.latitude) , longitude: parseFloat(item.longitude) , draggable: item.isFull,label:'A'};
        
        this.trash.push(this.mk);
      } 
    console.log("blah");
  },
  (error)=>{console.log(error);}
);
console.log("here"); 

  //console.log(this.dustbins);
 //   console.log(this.dustbins);
 this.searchControl = new FormControl();
  this.mapsAPILoader.load().then(
    ()=>{
      
      let autocomplete=new google.maps.places.Autocomplete(this.searchElement.nativeElement,{types:["address"]});
      autocomplete.addListener("place changed",()=>{
        this.ngZone.run(()=>
      {
        console.log("Here");
        let place : google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        if(place.geometry === undefined||place.geometry === null)
            {
              return;
            }
            this.location.latitude = place.geometry.location.lat();
            this.location.longitude = place.geometry.location.lng();
            this.locationIsSet=true;
            console.log(this.location);
            console.log(this.locationIsSet);
      })
      })
      
    }
  )
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
