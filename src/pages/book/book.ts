import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { parkinglot } from '../../models/parkinglot';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage implements OnInit {
  parkinglot:parkinglot;
  index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
ngOnInit()
{
  this.parkinglot=this.navParams.get('park');
  console.log(this.parkinglot);
  this.index=this.navParams.get('index');
  
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
bookslot(){

}
}
