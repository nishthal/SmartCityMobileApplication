import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthService } from '../../app/services/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BookspacePage } from '../bookspace/bookspace';
import {map, catchError} from 'rxjs/operators';
import { DustbinPage } from '../dustbin/dustbin';
import {CookieService} from 'angular2-cookie';
import { AuthenService } from '../../app/services/authen';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {
  mobile: number;
  token:string;
  bookPage: DustbinPage;
  rootPage:any;
  respon:number;
  o: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl: LoadingController,public authService:AuthService, public alertCtrl: AlertController,
     public toastCtrl:ToastController, public cookieService: CookieService, public authenService:AuthenService ){
      this.respon=-1;
   }
onSignin(form: NgForm)
{
  const loading =this.loadCtrl.create({
    content: 'Signing you in ....'
  });
    loading.present();
    this.authenService.login(form.value.phonenumber,form.value.password).then((response)=>{
    this.mobile =form.value.phonenumber; 
    this.o=response;   
    
    console.log(response);
    loading.dismiss();
    localStorage.setItem('token',this.o.token);
    this.authenService.getInfo(this.mobile,this.o.token).then(
    response=>{
     // this.respon=1;
      console.log(response);
    },
    reject=>{
      //this.respon=2;
      console.log('In reject');
      console.log(reject);
    }
    );
    
    //this.rootPage=this.bookPage;
    //this.navCtrl.setRoot(BookspacePage);
  },
  reject=>{
    loading.dismiss();
    const alert =this.alertCtrl.create({
      title: 'Signin failed!',
      message: reject.message,
      buttons: ['Ok']
    });
    console.log(reject);
    alert.present();
    console.log(reject);
  }
);

}
getOTP()
{
console.log("For getting an otp");
}
}
