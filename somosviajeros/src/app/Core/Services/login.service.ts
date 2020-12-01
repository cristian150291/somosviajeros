import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../Models/login.model';
import { Global } from './Global';
import { UserStorage } from '../Models/storage.model';
import { StorageService } from './storage.service';


@Injectable()
export class LoginService {

    public url:string;
    private vUser: UserStorage;
    private storage: StorageService;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;        
    }

    /** SET LOGIN
     * @Observations Login de usuario, se realiza la peticion al servidor,
     * en caso de ser json.error = "" osea login valido, guardamos el token y
     * referigimos la app a la pantalla del principal correspondiente para usuario
     * o empresa, en caso de ser empresa si no tiene cargado los datos de empresa lo
     * rederigimos antes a la carga de sus datos de empresa.
     *
     * @param login Se envia un Model de tipo login para solicitar acceso
     * @param path Se recibe el path donde se realiza la petición
     */
    setLogin(login: LoginModel, path : string):Observable<any>{

        this.vUser = new UserStorage('','','','','','','','','',false);
        this.storage = new StorageService();
        let idioma;

        if(this.storage.getCurrentSession() != null){
          this.vUser.setSession(this.storage.getCurrentSession());        
          if(this.vUser.getID() == ''){
            idioma = 'es';
          }else {
            idioma = this.vUser.getID();
          }
        }else {
          idioma = 'es';
        }
        

        let params = {
          'email'     : login.email,
          'pass'      : login.pass,
          'idioma'    : idioma
        };

        var headers : any;
        headers ={headers: Global.headers };
        return this._http.post(this.url+path+'/login',params,headers);
    }
    

    /** SET LOGIN EXTERNO (REDES SOCIALES)
    * @Observations Login de usuario pero utilizando redes sociales,
    * hasta ahora se programos para facebook y google
    * @param token token devuelto por servidor de red social
    * @param origen Origen de la res social ("facebook" o "google")
    */
    setLoginExterno(token:string,origen:string):Observable<any>{

      this.vUser = new UserStorage('','','','','','','','','',false);
      this.storage = new StorageService();
      let idioma;

      if(this.storage.getCurrentSession() != null){
        this.vUser.setSession(this.storage.getCurrentSession());        
        if(this.vUser.getID() == ''){
          idioma = 'es';
        }else {
          idioma = this.vUser.getID();
        }
      }else {
        idioma = 'es';
      }

      let send = {
        "tokene" : token,
        "origen" : origen,
        'idioma' : idioma
      };
      var headers:any;
      headers = {headers:Global.headers};

      return this._http.post(this.url+'usr/loginexterno',send,headers);
    }

}
