import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthService } from '../../app/services/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BookspacePage } from '../bookspace/bookspace';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user : user;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public loadCtrl: LoadingController,public authService:AuthService, public alertCtrl: AlertController, public toastCtrl:ToastController ){
     
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  
  
  onSignup(form: NgForm)
  {
    /*const loading= this.loadCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();*/
    console.log((form.value.password1));
      console.log((form.value.password2));
      
    if( form.value.password1 != form.value.password2 )
    {
      
      //loading.dismiss();
      const alert =this.alertCtrl.create({
          title:'SignUp failed!',
          message:'Password and COnfirm Password Does not match',
          buttons:['Ok']
      })
      alert.present();
    }
    else{
      //loading.dismiss();
      this.authService.signup(form.value.email,form.value.phonenumber,form.value.password).subscribe(data=>{
        console.log(data);
      },
    error=>{
      console.log(error);
    }
    ); 
        const toast =this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'
    })
    toast.present();
    toast.onDidDismiss(() => {
      this.navCtrl.push(SigninPage);
      console.log('Dismissed toast');
    });
      /*  
   this.authService.signup(form.value.email,form.value.phonenumber,form.value.password)
    .subscribe(response=>{
      loading.dismiss();
    },
    error => 
    {
      loading.dismiss();
      const alert =this.alertCtrl.create({
          title:'SignUp failed!',
          message:error.message,
          buttons:['Ok']
      })
      alert.present();
    });*/
  }
  }
}
