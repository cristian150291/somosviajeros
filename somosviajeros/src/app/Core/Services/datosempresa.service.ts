import { Injectable } from '@angular/core';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from './Global';

@Injectable()
export class DatosEmpresaService {

    private vUser: UserStorage;
    private storage: StorageService;
    private url= Global.urlService;

    constructor(
        private _http: HttpClient
    ){
       
    }

    // DATOS DE EMPRESA QUE REALIZA LA PETICION.
    getDatosEmp( ):Observable <any> {
        this.storage = new StorageService();
        this.vUser = new UserStorage('','','','','','','','','',false);
        this.vUser.setSession(this.storage.getCurrentSession());
        
        const send = {
            token: this.vUser.getToken()
        };
        let headers ={headers:Global.headers};
        return this._http.post(this.url + 'emp/datosempresa',send,headers);
    } 
}