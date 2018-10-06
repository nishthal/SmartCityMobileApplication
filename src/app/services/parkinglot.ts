import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Response} from '@angular/http';
import 'rxjs/Rx';
import { parkinglot } from '../../models/parkinglot';
import { onstreet } from '../../models/onstreet';
@Injectable()
export class parkinglotService{
    private parkingURL = 'http://192.168.43.222:8000/parking/api/parking_lots/' ;
    private onstreetURL = 'http://192.168.43.222:8000/parking/api/on_street_parking_slots/' ;
    parking : parkinglot[];
    onstreet: onstreet[];
    constructor(private http: HttpClient)
    {
        
    }
    getLots()
    {
        return this.http.get('http://192.168.43.222:8000/parking/api/parking_lots/').do((data)=>{
            if(data)
            {
                 this.parking = JSON.parse(JSON.stringify(data)) ;
            }
            else
            {
                this.parking=[];
            }
    })
    }
    getSlots()
    {
        return this.http.get('http://192.168.43.222:8000/parking/api/on_street_parking_slots/').do((data)=>{
            if(data)
            {
                 this.onstreet = JSON.parse(JSON.stringify(data)) ;
            }
            else
            {
                this.onstreet=[];
            }
    })
    }
    

}