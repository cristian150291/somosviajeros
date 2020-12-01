import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from '../Global';
import {UserStorage} from '../../Models/storage.model';

@Injectable()
export class DashboardService {

    private url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.urlService;
    }

    /** SOLICITUD DE " PRESUPUESTOS " DE EMPRESA
     * @Observations Esta peticion es la primera que se ejecuta en la carga de
     * dashboard para la muestra de presupuestos entrantes.
     * @param id ESTO SERIA EL SUPUESTO ID O EMPRESA QUE LO REQUIERE.
     * @param path EL PATH A DONDE SE REALIZA LA PETICION.
     */
    getPresupuestos (id: any, path): Observable<any> {

        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/presupuestos', id, headers);
    }

    /** SOLICITUD DE " BORRADORES " DE PRESUPUESTOS.
     * @Observations Este metodo realiza la peticion de los presupuestos
     * en borradores de la empresa cuando lo solicite.
     * @param id ESTO SERIA EL SUPUESTO ID O EMPRESA QUE LO REQUIERE.
     * @param path EL PATH A DONDE SE REALIZA LA PETICION.
     */
    getBorradores (id: any, path): Observable<any> {

        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/borradores', id, headers);
    }

    /** SOLICITUD " SIN RESPONDES ".
     * @Observations Este metodo realiza la peticion de presupuestos
     * sin responder de la empresa cuando lo solicite.
     * @param id ESTO SERIA EL SUPUESTO ID O EMPRESA QUE LO REQUIERE.
     * @param path EL PATH A DONDE SE REALIZA LA PETICION.
     */
    getSinResponder (id: any, path): Observable<any> {

        const headers = {headers: Global.headers};
        return this._http.post(this.url + path + '/sinresponder', id, headers);
    }
}
