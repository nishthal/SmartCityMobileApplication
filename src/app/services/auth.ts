import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import {Response} from '@angular/http';
import 'rxjs/Rx';
import { user } from '../../models/user';
//import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService{
    user1 :user;
    num:string;
    obv:any;
    constructor(private http: HttpClient)
    {   


    }
    signup(email: string ,phonenumber : number, password : string)
    {    
        var v=phonenumber;        
        this.num=v.toString();
        console.log(this.num);
        console.log(phonenumber);
        console.log(email);
        console.log(password);    
        return this.http.post( 'http://192.168.43.222:8000/accounts/api/users/' , { mobile : this.num, email : email , password : password } );
    }
    signin(phonenumber : number, password : string){  
       return this.http.post( 'http://127.0.0.1:8000/accounts/api/login/' , {username:phonenumber,password:password} );
    }
    onLogout()
    {  
        localStorage.removeItem('token');
     //   return this.http.post('http://127.0.0.1:8000/accounts/api/logout/');
    }
    getInfo(username: number, token:string)
    {
        
    /*return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
   
     /*   this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/todos', JSON.stringify(todo), {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
   
      });
        var v=username;
        console.log("here");
        console.log(username);
        console.log(v);
        this.num=v.toString();
        
        console.log(token);

        //return this.http.get( 'http://127.0.0.1:8000/accounts/api/users/',{token:token});
       */ 
        
    }
    getUsers()
    {
        return this.http.get('http://127.0.0.1:8000/accounts/api/users/');
    }
}