import { Injectable } from '@angular/core';

import { Http, Headers,RequestOptions} from '@angular/http';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
//import { HttpClient } from '@angular/common/http/src/client';
 
@Injectable()
export class AuthenService {
 
  public token: string;
  public num:string;
  constructor(public http: Http) {
 
  }
 
 /* checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 */
  login(username :number, password: string){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://127.0.0.1:8000/accounts/api/login/' , { username:username , password:password }, {headers: headers})
          .subscribe(res => {
            console.log(res);
            let data = res.json();
            this.token = (data.token).toString();
          //  this.storage.set('token', this.token);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
  getInfo( username : number,token : string ){
    var v=username;
    console.log("here");
    console.log(username);
    console.log(v);
    this.num=v.toString();
   
    return new Promise((resolve, reject) => {
 
       var headers = new Headers();
       headers.append('Content-Type', 'application/json' );
       headers.append('Token', '7db210b5bcb0b8177aac247a96c3e99e224f9f5c');
       const requestOptions = new RequestOptions({ headers: headers });
      
       console.log(headers);
        this.http.get( 'http://127.0.0.1:8000/accounts/api/users/',requestOptions)
          .map(res=>res.json()).subscribe(data => {
            resolve(data);
          }, (err) => {
              console.log("Error Here")
            reject(err);
          });
      });}
  logout(){
  //  this.storage.set('token', '');
  }
 
}