 /** STORAGE MODEL
  * @Observations : Modelo de dato para cargar datos de usuario en el local storage
  */
import {Injectable} from '@angular/core';
@Injectable()
export class UserStorage {
    public id: string;
    public nombre: string;
    public apellido: string;
    public email: string;
    public token: string;
    public img: string;
    public tipo: string;
    public empresa: any;
    public pReposicion: any;
    public isUpdate: boolean;

    constructor(id, nombre, apellido, email, token, img, tipo, empresa, data1, isUpdate : boolean){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.token = token;
        this.img = img;
        this.tipo = tipo;
        this.empresa = empresa;
        this.pReposicion = data1;
        this.isUpdate = isUpdate;
    }

    setSession(session: any){        
        if( session != null){
            this.id = session.id;
            this.nombre = session.nombre;
            this.apellido = session.apellido;
            this.email = session.email;
            this.token = session.token;
            this.img = session.img;
            this.tipo = session.tipo;
            this.empresa = session.empresa;
            this.pReposicion = session.pReposicion;
            this.isUpdate = session.isUpdate;
        }                
    }

    // GETTERS
    getEmpresa(): any{return this.empresa; }
    getEmail(): string{return this.email; }
    getToken(): string{return this.token; }
    getImg(): string{return this.img; }
    getUser(): string{return this.nombre + ' ' + this.apellido; }
    getID(): string{return this.id; }
    getName(): string{return this.nombre; }
    getLastName(): string{return this.apellido; }
    getPreposicion(): any { return this.pReposicion; }
    getIsUpdate ():any { return this.isUpdate; }
    getTipo(): string {return this.tipo; }

    // SETTERS
    setToken(token: string):void { this.token = token; }
    setEmpresa(empresa: any ):void {this.empresa = empresa; }
    setTipo(tipo: string):void {this.tipo = tipo; }
    setMail(email: string):void {this.email = email; }
    setPreposicion(repo: any):void { this.pReposicion = repo; }
    setIsUpdate ( isUpdate: boolean):void { this.isUpdate = isUpdate; }
    setId( idIdioma: string):void { this.id = idIdioma; }
    setApellido( apellido : string):void { this.apellido = apellido; }
    setNombre( nombre : string):void { this.nombre = nombre; }
}
