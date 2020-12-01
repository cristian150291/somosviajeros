import {Injectable} from "@angular/core";
//import { Route ,Router } from '@angular/router';


@Injectable()
export class StorageService {

  private localStorageService: any;
  private currentSession :any = null;
  private data :any=null;

  constructor(           
  ) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }


  /** CARGA NUEVA SESION DE USUARIO EN EL LOCAL STORAGE
   * @Observations Se le pasa por parametro la data del nuevo usuario 
   * para cargar en el local storage.
   *  
   * @param session @typedef any
   * @returns VOID.
   */
  setCurrentSession(session: any): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  /** RETORNA DATOS DE SESION DE USUARIO ACTUAL
   * @Observations Carga datos de sesion actual si existe, en caso de no
   * encontar datos de usuario cargados retorna null.
   * @returns any  -si existe data.
   * @returns null -si no existe data.
   */
  loadSessionData(): any{
    let sessionStr = this.localStorageService.getItem('currentUser');
    if(sessionStr == null){
      return null;
    }else{
      return JSON.parse(sessionStr);
    }
  }

  /** CARGAR DATOS AL LOCAL STORAGE
   * @Observations Metodo para cargar datos al local storage, se le debe pasar 
   * nombre de llave a guardar y datos asociados.
   * @param data @typedef any
   * @param name @typedef string
   * @returns void
   */
  setDataAny(data:any,name: string):void{
    this.data = data;
    this.localStorageService.setItem(name,JSON.stringify(this.data));
  }

  /** OBTENER DATOS DEL LOCAL STORAGE
   * @Observartions Carga datos del local storage, se debe indicar la llave
   * del dato a cargar.
   * @param name @typedef string  nombre de llave.
   * @returns any.
   */
  loadData(name:string):any {
    this.data = this.localStorageService.getItem(name);
    if (this.data == null) {
      return null
    }
    return JSON.parse(this.data);
  }

  /** EXISTE DATO EN EL LCOCAL STORAGE
   * @Observations Valida si existe datos en el local stirage previamente 
   * cargados con la llave pasada por parametro.
   * 
   * @param name @typedef string
   * @returns TRUE OR FALSE.
   */
  existData(name:string):boolean{
    this.data = this.localStorageService.getItem(name);
    if(this.data == null) {
      return false;
    }else{
      return true;
    }
  }

  /** ELIMINAR DATOS DEL LOCAL STORAGE
   * @Observations Elimina datos del local storage previamente cargados, 
   * se le debe indicar la llave del dato a eliminar
   * 
   * @param name  @typedef string
   */
  removeData(name:string):void{
    this.localStorageService.removeItem(name);
    this.data=null;
  }

  /** RETORNA SESION ACTUAL
   * @Observations Retoran sesion actual previamente cargada por 
   * loadCurrentSesison().
   * @returns any
   */
  getCurrentSession(): any {    
    return this.currentSession;
  }

  /** RETONA SI EXISTE DATO DE USUARIO EN LE LOCAL STORAGE
   * @Observations Retorna TRUE OR FALSE si existe datos de usuario 
   * en el local storage.
   * 
   * @returns TRUE OR FALSE
   */
  isExist(){
    if(this.currentSession == null ){
      return false;
    }else{
      return true;
    }    
  }

  /** ELIMINAR USUARIO DEL LOCAL STORAGE. 
   * @Observations Elimina cuenta de usuario del local storage.
   * 
   * @returns VOID
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /** OBTENER TOKEN DE LA SESION ACTUAL CARGADA
   * @Observations Retorna el token almacenado en el locas storage
   * de la sesion actual que este corriendo.
   * @returns token @typedef string   -Si existe sesion
   * @returns token @typedef null     -Si no existe sesion
   */
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  
  logout(): void{
    this.removeCurrentSession();    
  }

  isEmpty(obj) {
    return !obj || !Object.keys(obj).some(x => obj[x] !== void 0);
  }

	/** DELETE FULL STORAGE 
	* @Observations : Elimina todos los marcadores que existan en el local storage.
	* @return void.
	*/ 
	deleteFullStorage():void {

		if(this.existData('marker') || this.existData('baja') || this.existData('empresaAux') ){
			if(this.existData('marker') && this.existData('baja') && this.existData('empresaAux') ){
				this.removeData('marker');
				this.removeData('baja');
				this.removeData('empresaAux');
			}else if (this.existData('baja')){
				this.removeData('baja');
			}else if (this.existData('marker')) {
				this.removeData('marker');
			}else if (this.existData('empresaAux')){
				this.removeData('empresaAux');
			}
	 	}

	}


}
