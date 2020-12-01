import { Component, OnInit,  ViewChild , ElementRef, TemplateRef} from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Router } from '@angular/router';
import { StorageService } from '../../../Core/Services/storage.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MarkerService } from '../../../Core/Services/marker.service';
import { NuevaSucursalModel } from '../../../Core/Models/Empresa/nueva-sucursal.model';
import { DatosEmpresaService } from '../../../Core/Services/datosempresa.service';
import { NuevaEmpresaService } from '../../../Core/Services/Empresa/nuevaempresa.service';
import { errorService } from '../../../Core/Services/Error/error.service';
import { GoogleMapsModule  } from '@angular/google-maps';


@Component({
  selector: 'app-puntotrabajo1',
  templateUrl: './puntotrabajo1.component.html',
  styleUrls: ['./puntotrabajo1.component.sass'],
  providers : [ NuevaEmpresaService, DatosEmpresaService ]
})
export class Puntotrabajo1Component implements OnInit {

  //Prueba luego eliminar
  map: google.maps.Map;

  // CANTIDAD DE MARCADORES
  public countMarker:number=0;

  // NOMBRE PARA ELIMINAR MARCADOR DESDE LISTA INFERIOR.
  public nameDeleteInferior = '';


  // GUARDA ID PARA ELINIAR DEL ARRAY DE LA LIST
  public deleteArray: number = null;

  // MODAL REF DE NG MODAL
  public modalAlertp1 : NgbModalRef;
  public msgError: string;

  // VARIABLES PARA EL MANEJO DE MAPAS.
  public zoom = 15;
  public display?: google.maps.LatLngLiteral;
  public center: any;  
  public options: any;


  // CLASE MARKER SERVICE.
  private markerService: MarkerService

  // NOMBRE DUPLICADO
  public nombreDuplicado = "";

  // SERVICIO DE ERRORES CON MANEJO DE IDIOMA
  public errorService: errorService;

  // ARRAY EN MEMORIA PARA MANEJAR LOS PUNTOS DEL MAPA
  public marker: any[] = [];
  public baja: any[] = [];
  private storage: StorageService;
  private vUser: UserStorage;
  // GUARDA NOMBRE A ELIMINAR ( PUNTO EN EL MAPA )
  public namePT = '';

  // SUCURSAL MODEL
  public sucursalModel: NuevaSucursalModel;

  // REFERENCIAS MODALES
  public modal: NgbModalRef;
  public modalDel: NgbModalRef;  
  public modalAlert : NgbModalRef;
  public modalpt : NgbModalRef;
  public modalFinalizar : NgbModalRef;
  public modalPopUp : NgbModalRef;

  // GUARDO EVENTOS CLICK NE MODALES
  public eventMarker: any;
  public eventMarkerDel: any;

  // GUARDA MENSAGE EVENTO CLOSE MODAL
  public closeResult: any;

  // GUARDO NOMBRE DE EMPRESA PARA MOSTRAR AL USUARIO ANTES DE ELIMINAR UN PUNTO DEL MAPA
  public nameMarDelte: string;
  // GUARDO ID DEL PUNTO DE TRABAJO A MODO REF PARA PODER ELIMINAR DEL ARRAY.
  public idMarDelete: number = null;

  // GUARDO DATO TRAIDO POR PARAMETRO DE LA RUTA PARA INDENTIFICAR SI ES UN UPDATE O NO
  private update: string;  

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('popUpContent') refPopUp : TemplateRef<any>;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('btnSiguiente') btnSiguiente : any;
  @ViewChild('inputGoogle') refInputGoogle : any;
  @ViewChild(GoogleMapsModule , { static: false }) gmap: GoogleMapsModule;

  constructor(
      private navegacion: Router,
      private modalService: NgbModal,
      private activateRoute: ActivatedRoute,
      public ref: ElementRef,      
      private _serviceEmpresa: NuevaEmpresaService,
      private _dataEmp: DatosEmpresaService
  ) {

    this.sucursalModel = new NuevaSucursalModel('', '', '', '', '', '', '');
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);

    if (this.storage.getCurrentSession() != null ) {
      this.vUser.setSession(this.storage.getCurrentSession());
    }

    // IDENTIFICO MEDIANTE LA RUTA SI ES UN UPDATE DE PUNTO DE TRABAJO.
    this.update = this.activateRoute.snapshot.params.update;

    this.markerService = new MarkerService();

    // ANTES DE CONTINUAR SI TENEMOS DATOS SUCIOS LIMPIAMOS TODO DEL LOCAL STORAGE
    if(this.storage.existData('marker') || this.storage.existData('baja')){
      if(this.storage.existData('marker') && this.storage.existData('baja')){
        this.storage.removeData('marker');
        this.storage.removeData('baja');
      }else if (this.storage.existData('baja')){
        this.storage.removeData('baja');
      }else if (this.storage.existData('marker')) {
        this.storage.removeData('marker');
      }      
    }

    // SI VIENE DE UN UPDATE SI O SI DEBE TENER SUCURSAL. 
    if ( this.update == 'update') {
      this.vUser.setIsUpdate(true);
      this.storage.setCurrentSession(this.vUser);
      if(this.vUser.getPreposicion() != ''){            
        let datosMarker = this.vUser.getPreposicion();        
        this.marker = this.markerService.buildMarkerLocal(datosMarker);
				this.countMarker = this.marker.length;
        this.center = this.marker[0].position;
      }

    }else {
      // SI EXISTE DATOS DE MARKER EN EL LOCAL STORAGE LOS CARGO Y MUESTRO.
      if (this.storage.existData('marker')){
        this.marker = this.storage.loadData('marker');
				this.countMarker = this.marker.length;
        this.center = this.marker[0].position;
      }
    }   

  }


  ngOnInit(): void {        
    this.lanzarPopUp();          
  }

  /**SELECCION POR CLICK EN EL MAPA
   * @Observations Seleccion de punto cardinal de manera manual,
   * este eveto se lanza al tocar un punto en el mapa,
   * capturando latitud y longitud del mismo. Por cuestiones de error de tipeo
   * se consultara si realmete se desea registrar dicho punto.
   * @param event datos de seleccion manual.
   */  
  mapClicked(event: any, content: any){
    
    this.eventMarker = event; // GUARDO EVENTO CLICK EN EL MAPA, (MANUAL)
    // SETEO LET DE NOMBRE DUPLICADO
    this.nombreDuplicado = "";
    this.modal = this.modalService.open(content);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
    this.modal.result.then((e) => {
    // DIALOGO CERRADO
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  /** GUARDAR MARKER MANUAL
   * 
   * @Observatrions Este evento si del modal para seleccion un punto de 
   * reposicion en el mapa de manera manual, antes se valida que realmente
   * se halla escrito un nombre para dicho punto de reposicion.
   */
  guardarMarker (formModal: any){
    if (this.namePT != ''){
      // VERIFICO SI YA EXISTE UN MARCADOR CON ESTE NOMBRE.
      if(!this.markerService.checkNameMarker(this.namePT)){
        this.modal.close();
        // GUARDO MARCADOR
        this.markerService.setMarker(this.eventMarker,this.namePT);
        // ACTUALIZO MARCADOR
        this.marker = this.storage.loadData('marker');
	// ACTUALIZO COUNTMARKER
	this.countMarker = this.marker.length;
        // SETEO NOMBRE DUPLICADO
        this.nombreDuplicado = "";

      }else{
        this.storage = new StorageService();
        this.vUser.setSession(this.storage.getCurrentSession());
        this.errorService = new errorService();
        this.nombreDuplicado = this.errorService.meesageErrorLang('MSGNAMEDUPLICADO',this.vUser.getID());
      }
      
    } 
    this.namePT = '';
    formModal.reset();
  }

  /**  ELIMINAR MARKER 
   * @Observations Metodo para eliminar un Market directamente desde el mapa,
   * recibo el evento disaparo del click de google maps, y me retorna lat y lng
   * valido con los marker cargados que indice tiene para sacarlo del array de marker
   * 
   * @param event datos evento click google maps
   */
  delMarker(){
    if (this.idMarDelete != null ){
      this.modalDel.close();
      // ELIMINO MARCADOR Y ACTUALIZO DATOS.
      this.markerService.deletedMarker(this.idMarDelete);
      // CARGO LOS NUEVOS DATOS DEL LOCAL STORAGE
      this.marker = this.storage.loadData('marker');
      // ACUTALIZO COUNTMARKER
      this.countMarker = this.marker.length; 
      // SETEO ID DONDE GUARDO DATOS PARA ELIMINAR MARKER.
      this.idMarDelete = null;
    }else{
      // AL PASAR AL PRODUCCION SE DEBE DE ELIMINAR.
      console.log('id = null');
    }
  }

  /** OPEN MARKER DELETE
  * @Obsercations : Este obtiene el nombre a eliminar del marcador 
  * clikeado en el mapa, y luego abre modal para asegurar si se eliminar
  * de manera definitiva, en caso de exito dispara metodo = "delMarker()";
  */
  openMarkerDelete ( event: any, delContent: any){
    this.eventMarkerDel = event;

    // OBTENEMOS NOMBRE DEL MARKER Y EL IDENTIFICADOR
    Object.entries(this.marker).forEach((key, value) => {
      if (key[1].position.lat == this.eventMarkerDel.latLng.lat() && key[1].position.lng == this.eventMarkerDel.latLng.lng()){
        this.nameMarDelte = key[1].title;
        this.idMarDelete = key[1].id;
      }
    });
    // ABRIMOS DIALOG
    this.modalDel = this.modalService.open(delContent);
    this.modalDel.result.then((e) => {
      // DIALOGO CERRADO
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
 
   /**ELIMINAMOS ELEMENTOS DEL DOM Y STORAGE
   * @Obsercations Metodo para eliminar ciudades que el usuario por alguna
   * cuestion en particular no las quiera.
   */  
  deleteIndice(){
    if (this.deleteArray != null){
      this.closePt();
      // ELIMINO MARCADOR.
      this.markerService.deletedMarker(this.deleteArray);
      // ACTUALIZO MARCADOR.
      this.marker = this.storage.loadData('marker');
      // ACTUALIZO COUNTMARKER
      this.countMarker = this.marker.length;
      // VACIO NOMBRE A ELIMINAR.
      this.nameDeleteInferior = '';
    }
  }

  /** POSICIONAR MARCADOR
   * @Observations Evento click para posicionar el markador en el 
   * mapa para que sea mas rapido la visibilidad.
   */
  showPointer(idMarker: any){
    this.center = this.marker[idMarker].position;
  }


   /**ENVIO TODOS LOS DATOS DE SUCURSAL
   * @Observable Metodo envio datos de sucursal, debemos enviar una sola
   * llamada, lat  lng,  utililzar el formato WKT dentro de un
   * string.
   */
  onSubmit(){
      this.modalFinalizar.close();
      this.btnSiguiente.nativeElement.disabled = true;
      this.storage = new StorageService();
      this.vUser.setSession(this.storage.getCurrentSession());
      // ENVIAMOS DATOS AL SERVICE           
      this.sucursalModel.token = this.vUser.getToken();                        
      // VERIFICO SI HAY BAJAS.
      if(this.storage.existData('baja')){
        this.sucursalModel.baja =  this.storage.loadData('baja');
      }
      
      if (!this.vUser.getIsUpdate()) {         //NUEVO REGISTRO ( ALTA )
        this.sucursalModel.tipo = 'new';
        this.sucursalModel.marker = this.marker;              
        this.sucursalModel.empresa = this.storage.loadData('empresaAux');              
      }else {                                  //EDIT REGISTRO  ( UPDATE )
        this.sucursalModel.tipo = 'edit';
        this.sucursalModel.marker = this.markerService.newAltas();
        this.sucursalModel.empresa = this.vUser.getEmpresa();
      }
      
      // REALIZAMOS ALTA EN LA API
      this._serviceEmpresa.setSucursalEmpresa(this.sucursalModel, 'emp').subscribe(
        response => {                
          if (response.error == ''){                  
            // GUARDAMOS NUEVO TOKEN , MARKER Y NOS VAMOS A DESBOARD ( EMPRESA YA LO TENGO )
            this.vUser.setToken(response.token);
            this.vUser.setEmpresa(this.sucursalModel.empresa);
            this.vUser.setPreposicion(this.marker);
            this.storage.setCurrentSession(this.vUser);

            // SOLICITAMOS DATOS DE SUCURSALES
            this._dataEmp.getDatosEmp().subscribe(
              response => {                      
                this.btnSiguiente.nativeElement.disabled = false;
                if(response.error == ''){
                  //GUARDAMOS TOKEN DEVUELTO.
                  this.vUser.setToken(response.token);
                  this.vUser.setPreposicion(response.datossuc);
                  this.storage.setCurrentSession(this.vUser);
                }
              },
              error => {
                // ERROR SOLO PARA DESARROLLADOR.
                this.btnSiguiente.nativeElement.disabled = false;
                console.log("getDatosEmpresa : ", error);
              }
            );
            
            this.vUser.setIsUpdate(false);
            this.storage.setCurrentSession(this.vUser);
            this.storage.removeData('marker');
            this.storage.removeData('baja');
            if(this.storage.existData('empresaAux')){
              this.storage.removeData('empresaAux');
            }
            // SALIDA CON EXITO, LO DERIGIMOS AL DASHBOARD DE EMPRESA
            this.navegacion.navigate(['home-empresa/dashboard/entrantes']);

          }else{           

            this.vUser.setToken(response.token);                  
            this.storage.setCurrentSession(this.vUser);
            
            // SOLICITAMOS DATOS DE SUCURSALES
            this._dataEmp.getDatosEmp().subscribe(
              responseData => {                      
                this.btnSiguiente.nativeElement.disabled = false;
                if(responseData.error == ''){
                  //GUARDAMOS TOKEN DEVUELTO.
                  this.vUser.setToken(responseData.token);
                  this.vUser.setPreposicion(responseData.datossuc);
                  this.storage.setCurrentSession(this.vUser);
                  this.marker = this.markerService.buildMarkerLocal(this.vUser.getPreposicion());
                  this.storage.removeData('marker');
                  this.storage.removeData('baja');
                }else{
                  this.vUser.setToken(responseData.token);      
                  this.storage.setCurrentSession(this.vUser);                  
                }
              },
              error => {
                // ERROR SOLO PARA DESARROLLADOR.
                this.btnSiguiente.nativeElement.disabled = false;
                console.log("getDatosEmpresa : ", error);
              } 
            );
            
            this.btnSiguiente.nativeElement.disabled = false;
            this.storage.setCurrentSession(this.vUser);     
            // MENSAJE DE ERROR DEL SERVICE PARA MOSTRAR AL USUARIO.
            this.msgError = response.error;
            this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
            this.modalAlert.result.then((e) => {
            // DIALOGO CERRADO
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });                    
          }
        },
        error => {
          // ERROR SOLO PARA DESARROLLADOR.
          this.btnSiguiente.nativeElement.disabled = false;
          console.log("Error on submit punto trabajo1 line 395 : ", error);
        }
      );

  }


  /**  CIERRE DE MODALES DE LA PANTALLA  */
  closeDel(){ this.modalDel.close(); }
  closeAlert(){ this.modalAlert.close(); }
  close(modalForm: any){ modalForm.reset(); this.modal.close(); }
  closePt(){ this.modalpt.close();}  
  closeModalFinalizar(){ this.modalFinalizar.close();}
  closeModalPopUp(){ this.modalPopUp.close(); }

  /**EVENTO CHANGES DE INPUT GOOGLE SEARCH
   * 
   * @Observations Evento de tipo change para cada vez que el usuario seleccione una
   * direccion se dispara y capturamos todos los datos de la selccion.
   *
   * @param address parametro de tipo Address
   */
  handleAddressChange(address: Address) {
    this.center = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng()};
    this.refInputGoogle.nativeElement.value = '';    
  }

  /** APERTURA DE MODAL ELIMNAR LISTA DE MARCADORES
   * @Observations : Abre modal para eliminar items de la lista 
   * de marcadores selecionados del mapa.
   * @param content
   */
  open(content: any, item: any) {
    this.deleteArray = item;

    Object.entries(this.marker).forEach((key, value) => {
    	if (key[1].id == item ) {
	   this.nameDeleteInferior = key[1].title;
	}
    });

    this.modalpt = this.modalService.open(content);
    this.modalpt.result.then((e) => {
    });
  }

  /** ABRE MODAL FINALIZAR
  * @Observarions : Este abre modal finalizar, si apreta que si, dispara el
  * OnSubmit() metodo que envia los datos recolectados para el "curd".
  * @param contenedor nombre del contenedor del modal (#finContenedor).
  */
  abrirModalFinalizar (contenedor: any): void {
    this.modalFinalizar = this.modalService.open(contenedor);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
    this.modalFinalizar.result.then((e) => {
    // DIALOGO CERRADO
    }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });                    
  }

  /** LANZA POP UP 
  * @Observations : Este metodo lanza un pop up de notificacion
  * le notifica al usuario que debe tocar el mapa, para seleccionar un 
  * marcador den el mismo.
  */
  lanzarPopUp(){
    setTimeout(()=>{
      this.modalPopUp = this.modalService.open(this.refPopUp);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
      this.modalPopUp.result.then((e) => {
        
      }, (reason) => {
        console.log('Dimissed');
	this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }); 
      },800)
  }

  /** GETDIMISSREASON
  * @Observarions : Este vento se cargar cuando levantamos un modal,
  * este mismo captura el boton 'esc' , click fuera del modal, o 
  * click en la cruz para cerra el modal, con un callback para disparar
  * alguna funcionabildad extra si se requiere.
  */

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.namePT = '';
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.namePT = '';
      return 'by clicking on a backdrop';
    } else {
      this.namePT = '';
      return `with: ${reason}`;
    }
    
  }

}
