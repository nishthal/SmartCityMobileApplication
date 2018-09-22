
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { location } from '../../models/location';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
location: location;
marker: location;
  constructor(public navParams: NavParams,private viewCtrl: ViewController) {
    
    this.location =this.navParams.get('location');
    this.location.latitude=30.26778;
    this.location.longitude=76.26778;
    if(this.navParams.get('isSet')){  this.marker=this.location;}
  }
onSetMarker(event: any){
  console.log(event);
  this.marker=new location(event.coords.lat,event.coords.lng);
}
onConfirm(){
  this.viewCtrl.dismiss({location : this.marker});
}
onAbort(){
this.viewCtrl.dismiss();
}
}
