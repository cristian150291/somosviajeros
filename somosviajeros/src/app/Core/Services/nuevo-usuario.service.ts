import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { NuevoUserModel } from '../Models/nuevouser.model';
import { Global } from './Global';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class NuevoUserService {

    public url:string;
    private storage: StorageService;
    private vUser: UserStorage;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;
    }

    /** GET NEW USER
     * @Observations Este metodo realiza la peticion de nuevo usuario,
     * si la respuesta es satisfactoria json.error es vacio, por ende se nos 
     * enviara un mail con codigo para verificar el correo electronico, en ese momento 
     * redirigimos la pagina al ingreso del codigo de verificacion enviado por el server 
     * al mail en cuestion.
     * En caso de json.error distinto de vacion se genera un mensaje de erroe al usuario 
     * con el error como respuesta del servicio, entre ellos puede ser : 
     * correo en espera de verificacion, correo ya existente en la base de datos.
     * 
     * @param nuevouser Se envia un Model de tipo nuevo user para enviar al server
     * @param path Se recibe el path donde se realiza la petición
     */
    getNuevoUser(nuevouser: NuevoUserModel, path : string):Observable<any>{
        this.storage = new StorageService();
        this.vUser   = new UserStorage('','','','','','','','','',false);
        let idioma,params;
        if(this.storage.getCurrentSession() != null){
            this.vUser.setSession(this.storage.getCurrentSession());
            if(this.vUser.getID() == ''){
                idioma = 'es';
            }else{
                idioma = this.vUser.getID();
            }
        }else{
            idioma = 'es';
        }
        
        params = {
            'email'  : nuevouser.email,
            'idioma' : idioma
        };            

        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/nuevousuario',params,headers);       
    }

    getOlvEmail(nuevouser: NuevoUserModel, path : string):Observable<any>{
        this.storage = new StorageService();
        this.vUser   = new UserStorage('','','','','','','','','',false);
        let idioma,params;
        if(this.storage.getCurrentSession() != null){
            this.vUser.setSession(this.storage.getCurrentSession());
            if(this.vUser.getID() == ''){
                idioma = 'es';
            }else{
                idioma = this.vUser.getID();
            }
        }else{
            idioma = 'es';
        }

        params = {
            'email' : nuevouser.email,
            'idioma': idioma
        };

        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/passolvidada',params,headers);
    }

    verificoOlvPass(send:any, path : string):Observable<any>{
        let headers ={headers:Global.headers};
        return this._http.post(this.url+path+'/cambiapass',send,headers);
    }


}