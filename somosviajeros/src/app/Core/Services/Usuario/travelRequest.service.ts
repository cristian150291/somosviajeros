import { HttpClient } from '@angular/common/http'; //Para peticiones ajax
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from '../Global';

@Injectable()
export class  TravelRequestService {
    
    private url:string;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;
    }

    /** GET TRAVEL REQUEST
     * @Observations Realiza peticion para presupuesto de viaje, solicitud de usuario
     * 
     * @param codigo Se envia un Model de tipo codigo vericacion de mail
     * @param path Se recibe el path donde se realiza la petición
     */
    sendTravelRequest(send:any, path : string):Observable<any>{
        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/solicitudnuevopresupuesto',JSON.stringify(send),headers);     
    }

}
