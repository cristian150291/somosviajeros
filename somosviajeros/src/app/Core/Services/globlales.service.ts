import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from './Global';

 @Injectable()
 export class GlobalesService {


    constructor(
        private _http:HttpClient
    ){

    }


    /** GET PROVINCIAS
     * @Observations : Metodo que retorna lista de provincias.
     * @token  Se le debe enviar el ultimo token para realizar la consulta.
     * @pidnacion Es un id para filtar por nacion la lista de provincias.
     */
     getProvincias(token:string,idnacion:string):Observable<any>{        
        var send = {
            'token' : token,
            'idnacion' : idnacion
        };
        let headers ={headers:Global.headers};
        return this._http.post('/api/dat/provincias',send,headers);    
     }

   /** GET CIUDADES 
     * @Observations : Metodo que retorna lista de ciudades.
     * @token  Se le debe enviar el ultimo token para realizar la consulta.
     * @pidnacion Es un id para filtar por nacion la lista de provincias.
     * @idprovincias Es una variable de filtro para traer ciudades de provincias determinadas
     */
    getCiudades(token:string,idnacion:string,idprovincia:string):Observable<any>{        
        var send = {
            'token' : token,
            'idnacion' : idnacion,
            'idprovincia' : idprovincia
        };
        let headers ={headers:Global.headers};
        return this._http.post('/api/dat/ciudades',send,headers);    
     }


 }
