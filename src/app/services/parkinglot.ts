import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Response} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class parkinglotService{
    private getUrl = 'http://127.0.0.1:8000/parking/parking_lots/?format=api' ;
    constructor(private http: HttpClient)
    {
        
    }
    getLots()
    {
        return this.http.get(this.getUrl);
    }
}