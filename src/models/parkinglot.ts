export class parkinglot{
    constructor(public longitude: number,public latitude: number,public location:string,
         public city:string, public state:string,public parkedusers : number, public isFull:boolean, public price: number ){

    }
}