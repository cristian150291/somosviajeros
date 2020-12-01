import { Injectable } from '@angular/core';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';

@Injectable()
export class MarkerService {

/** CLASE CONFIGURACION EMPRESA ( GRUB )
 * @Observations Esta clase tiene implementado metodos para solventar solucion 
 * al manejo de market y alta de empresa.
 */

  private vUser: UserStorage;
  private storage: StorageService;  
  public marker: any[] = [];
  private baja: any[]=[];
  private newArrayAux: any[] = [];
  private colorGloboMaps = '#00A974';

  constructor(
  ){
      this.storage = new StorageService();
      this.vUser = new UserStorage('','','','','','','','','',false);
      this.vUser.setSession(this.storage.getCurrentSession());
  }

  /** RE CONSTRULLE MARKER PARA LA PANTALLA DE CARGA DE SUCURSAL Y PODER MOSTRARLO EN MAPA DE GOOGLE MAPS
   * @Observations Este metodo se ejecuta al iniciar pantalla de carga de mapas en empresa para reconstruir
   * los markadores con sus decoradores para poder mostrarlos en el mapa.
   * 
   * @param data Array de marcadores
   * @returns any  --Array nuevo de marcadores
   * @typedef array
   */
  buildMarkerLocal(data: any[]): any {        
      Object.entries(data).forEach((key , value) => {
        this.marker.push({
          position: {
            lat: key[1].lat ,
            lng: key[1].lng ,
          },
          label: {
            color: this.colorGloboMaps,
            text: key[1].nombre,
          },
          title: key[1].nombre, 
          id: value,
          idDb : key[1].id,
         // options: { animation: google.maps.Animation.BOUNCE },
          options: { animation: null },
        });
      });  
      
      this.storage.setDataAny(this.marker,'marker');        
      return this.marker;
  }

  /** ELIMINA MARCADOR DEL LOCAL STORAGE
   * @Observations Este metodo elimina un marcador del mapa seleccionado,
   * tiene en cuenta si realmente estamos hablando de un markador de la base de datos o 
   * si es un markador que se esta trabajando en tiempo real. 
   * @param id  marcador que se va a eliminar.
   * @typedef integer
   * @return void
   */
  deletedMarker (id): void {
    this.marker = this.storage.loadData('marker');

    // SI TENGO YA CARGADO BAJAS, LAS LEVANTO EN MEMORIA PARA CONCATENAR LAS SIGUIENTES SI ES QUE EXISTEN.
    if (this.storage.existData('baja')){
      this.baja = this.storage.loadData('baja');
    }

    // SI EL AL ELIMINAR MARCADOR TIENE ID DE DATA BASE LO CARGAMOS EN UN ARRAY PARA ENVIARLO AL SERVICIO Y DARLO DE BAJA._mat-animation-noopable
    if (this.marker[id].idDb != '') {
      this.baja.push(
          this.marker[id].idDb        
      );
    }

    // SI SE CARGA ALGO LO GUARDAMOS EN EL LOCAL STORAGE PARA LUEGO ENVIARLO AL SERVICIO PARA SU RESPECTIVA BAJA.
    if (this.baja.length > 0 ){    
      this.storage.removeData('baja');
      this.storage.setDataAny(this.baja, 'baja');                  
    }

    // ELIMINO MARKER DEL ARRAY.
    this.marker.splice(id, 1);

    // REORBENO IDS
    Object.entries(this.marker).forEach(
      (key, value) => {
        key[1].id = value;
      }
    );

    if (this.storage.existData('marker')){
      this.storage.removeData('marker');
      this.storage.setDataAny(this.marker, 'marker');
    }else {
      this.storage.setDataAny(this.marker, 'marker');
    }
  }

  /** CARGAR NUEVO MARCADOR
   * @Observations Metodo para cargar nuevo marker al local storage.
   * @param data contiene datos de google (veneto "eventMarker"). 
   * @param nombre nombre del marcador.
   */
  setMarker(data: any , nombre) {

    if(this.storage.loadData('marker') != null){
      this.marker = this.storage.loadData('marker');
    }
    
    this.marker.push({
      position: {
        lat: data.latLng.lat() ,
        lng: data.latLng.lng() ,
      },
      label: {
        color: this.colorGloboMaps,
        text: nombre,
      },
      title: nombre,
      id: this.marker.length,
      idDb : '',
  //    options: { animation: google.maps.Animation.BOUNCE },
      options: { animation: null },
    });

    if (this.storage.existData('marker')){
      this.storage.removeData('marker');
      this.storage.setDataAny(this.marker, 'marker');
    }else {
      this.storage.setDataAny(this.marker, 'marker');
    }
  }


  /** CARGA ARRAY DE NUEVA ALTA.
   * @Observations EN este punto ya identificque que es un edit, por lo tanto , si tenemos nuevos puntos de 
   * reposicion, armo un array para enviar a la base de datos.
   * 
   * @returns any @typedef array
   */
  newAltas():any[] {
    if (this.storage.existData('marker')){
      this.marker = this.storage.loadData('marker');

      if(this.marker.length > 0){
        Object.entries(this.marker).forEach((key , value) => {
          if(key[1].idDb === ''){
            this.newArrayAux.push({
              latlng : key[1].position ,
              nombre : key[1].title
            });
          }      
        });  
      }

    }else {
      this.newArrayAux.push({});
    }

    return this.newArrayAux;
  }

  /** REDUNDACIA DE DATOS
   * @Observations Este metodo valida que no exista redundancia de datos en los marcadores,
   * los nombreS de los mismos no pueden ser repetidos.
   * @param name @typedef string 
   * @returns TRUE OR FALSE
   */
  checkNameMarker(name : string ):boolean {
    let esDuplicado = false;
    this.storage = new StorageService();

    if(this.storage.existData('marker')){
      this.marker = this.storage.loadData('marker');
    }

    if(this.marker.length > 0){
      Object.entries(this.marker).forEach((key , value) => {
        if( String(key[1].title).toUpperCase() === name.toUpperCase() ){
          esDuplicado = true;
        }      
      });  
    }

    return esDuplicado;
  }
}
