import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from './Global';


@Injectable()
export class CodigoService {
    
    private url:string;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;
    }

    /** SET CODIGO
     * @Observations Se recibe codigo enviado al mail para verificarlo
     * 
     * @param codigo Se envia un Model de tipo codigo vericacion de mail
     * @param path Se recibe el path donde se realiza la petición
     */
    verificarCodigo(send:any, path : string):Observable<any>{
        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/confirmaregistro',send,headers);     
    }

    /**VERIFICA CODIGO DE OLVIDE MI CONTRASEÑA
     * @Observatrions Esta peticion esta mal, pido disculpas a los ojos del
     * espectador, se deberia modificar el de arriba y pasarle solo el parametro
     * del controlador que lo requiere, son las 02:00 hs, me muero de sueño.
     * @param send
     * @param path
     */
    verificarCodigooLV(send:any, path : string):Observable<any>{
        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/restaurarpass',send,headers);
    }
}
