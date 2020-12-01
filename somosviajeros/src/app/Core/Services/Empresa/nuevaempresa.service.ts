import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { NuevaEmpresaModel } from '../../Models/Empresa/nueva-empresa.model';
import { StorageService } from '../storage.service';
import { UserStorage } from '../../Models/storage.model';
import { NuevaSucursalModel } from '../../Models/Empresa/nueva-sucursal.model';
import { Global } from '../Global';



@Injectable()
export class NuevaEmpresaService {

    private storage: StorageService;
    private sUser: UserStorage;
    private url: string;

    constructor (
        public _http: HttpClient
    ){

        this.sUser = new UserStorage('','','','','','','','','',false);
        this.url = Global.urlService;

    }

    /** ENVIO DE NOMBRE EMPRESA
     * @Observations Se realiza la carga de datos de empresa, nombre y cuit del mismo
     * 
     * @param params Datos de empresa, tipode de dato NuevaEmpresaModel
     * @param path Se recibe el path donde se realiza la petición
     */
    setNombreEmpresa(params: NuevaEmpresaModel, path: string): Observable <any>{
        this.storage = new StorageService();
        this.sUser.setSession(this.storage.getCurrentSession());
        // ARMO JSON A ENVIAR AL SERVER
        const send = {
            'empresa' : params,
            'tipo' : 'edit',
            'token' : this.sUser.getToken(),
            'idioma' : this.sUser.getID()
        };
        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/controlempresa', send, headers);
    }


    /** ENVIO DE DATOS SUCURSAL EMPRESA
     * @Observations Se realiza la carga de datos de sucursal para empresa
     * 
     * @param params Datos de empresa, tipode de dato NuevaEmpresaModel
     * @param path Se recibe el path donde se realiza la petición
     */
    setSucursalEmpresa(params: NuevaSucursalModel, path: string): Observable <any>{
        let send: any;

        this.storage = new StorageService();
        this.sUser.setSession(this.storage.getCurrentSession());
        
        if(params.tipo=='new'){
            send = {
                'empresa' : params.empresa ,
                'sucursal' : this.formatMarker(params.marker),
                'tipo' : params.tipo ,
                'token' : params.token,
                'idioma' : this.sUser.getID()
            };
        }else {
            send = {
                //'empresa' : params.empresa ,
                'sucursal' : params.marker ,
                'baja' : params.baja,
                'update' : {} ,
                'tipo' : params.tipo ,
                'token' : params.token,
                'idioma' : this.sUser.getID()
            };
        }
        
        const headers ={headers: Global.headers};
        return this._http.post(this.url + path + '/controlempresa', send, headers);
    }

    /** UPDATE NOMBRE EMPRESA
     * @Observations Se realiza el update de datos de empresa, nombre y cuit del mismo.
     * @param params Datos de empresa, tipode de dato NuevaEmpresaModel.
     * @param path Se recibe el path donde se realiza la petición.
     */
    updateNombreEmpresa (params: NuevaEmpresaModel, path: string): Observable <any>{

        this.storage = new StorageService();
        this.sUser.setSession(this.storage.getCurrentSession());
        // ARMO JSON A ENVIAR AL SERVER
        const send = {
            'cuit' : params.cuit,
            'nombre' : params.nombre,
            'token' : this.sUser.getToken(),
            'idioma' : this.sUser.getID()
        };
        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/updateemp', send, headers);
    }


    formatMarker (marker: any[]):any {
        let markerresult: any[] = [];        
        Object.entries(marker).forEach( (key, value) => {                    
                markerresult.push({
                    latlng : key[1].position ,
                    nombre : key[1].title
                });                
            }
        );

        if(markerresult.length <= 0){
            markerresult.push({});
        }

        return markerresult;
    }
}
