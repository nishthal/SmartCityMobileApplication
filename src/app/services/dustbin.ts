import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Response} from '@angular/http';
import 'rxjs/Rx';
import { dustbin } from '../../models/dustbin';
@Injectable()
export class dustbinService{
    private getUrl = 'http://127.0.0.1:8000/dustbin/api/dustbins/?format=json' ;
    public dustbins: dustbin[];
    constructor(private http: HttpClient)
    {
        
    }
    getDustbins()
    {
        return this.http.get('http://127.0.0.1:8000/dustbin/api/dustbins/?format=json').do((data)=>{
            if(data)
            {
                 this.dustbins = JSON.parse(JSON.stringify(data)) ;
            }
            else
            {
                this.dustbins=[];
            }
        });
    }
}