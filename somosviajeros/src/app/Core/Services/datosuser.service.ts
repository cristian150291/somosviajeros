import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { PasswordModel } from '../../Core/Models/password.model';
import { DatosUserModel } from '../../Core/Models/datosuser.model';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { Global } from './Global';


@Injectable()
export class DatosUserService{

    private storage:StorageService;
    private sUser:UserStorage;
    private url:string;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;
    }

    /** SET User
     * @Observations Este servicio arma el usaurio y password de las pantallas
     * dato-usasurios y datos-password, arma el json correspondiente y antes debemos
     * capturar el token enviado la ulitma vez, con todo esto armado se lo enviamos al servidor
     * para que valide dichos datos, una vez concluido no retornara los datos completos del nuevo 
     * usuario registrado en el sistema con su token actualizado.
     * 
     * @param datosuser Se recibe los datos de usuario
     * @param password Password ingrsado por el usuario, previamente validado
     * @param path La ruta a donde se realizara la peticion, en este usr
     */
    setUser(datosuser : DatosUserModel, password : PasswordModel, path : string):Observable<any>{        
        
        //OBTENER EL TOKEN
        this.storage = new StorageService();
        this.sUser = new UserStorage('','','','','','','','','',false);
        this.sUser = this.storage.getCurrentSession();

        //ARMO JSON A ENVIAR AL SERVER
        const send = {
            'nombre':datosuser.nombre,
            'apellido' :datosuser.apellido,      
            'pass' : password.pass,
            'token' : this.sUser.token,
            'idioma' : this.sUser.id
        }; 
        let headers ={ headers:Global.headers };
        return this._http.post(this.url+path+'/completaregistro',send ,headers);     
    }


}
