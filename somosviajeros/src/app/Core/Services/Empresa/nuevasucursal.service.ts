import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from '../storage.service';
import { UserStorage } from '../../Models/storage.model';
import { NuevaSucursalModel } from '../../Models/Empresa/nueva-sucursal.model';
import { Global } from '../Global';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class NuevaSucursalService {

    private storage: StorageService;
    private sUser: UserStorage;
    private url: string;

    constructor(
        public _http: HttpClient
    ){
        this.sUser = new UserStorage('', '', '', '', '', '', '', '', '',false);
        this.url = Global.urlService;
    }

    /** ENVIO DE SUCURSAL DE EMPRESA
     * @Observations Se realiza la carga de datos de sucursal
     * @param params Datos de sucursal, tipode de dato NuevaSucursalModel
     * @param path Se recibe el path donde se realiza la petición
     */
    setNuevaSucursal(params: NuevaSucursalModel, path: string): Observable <any>{
        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/nuevasucursal', params, headers);
    }

    /** UPDATE DE PUNTOS DE RECOLECCION O SUCURSALE.
     * @Observations Se realiza el update de datos de sucursal
     * @param params Datos de sucursal, tipode de dato NuevaSucursalModel
     * @param path Se recibe el path donde se realiza la petición
     */
    updateSucursal(params: NuevaSucursalModel, path: string): Observable <any>{
        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/updatesucursal', params, headers);
    }
}
