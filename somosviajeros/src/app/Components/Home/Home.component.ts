import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { StorageService } from '../../Core/Services/storage.service';
//Este se importa para captar parametros por las rutas
import { ActivatedRoute } from '@angular/router';
import { UserStorage } from '../../Core/Models/storage.model';
import { PanelviajesitermedioComponent } from '../Custom/panelviajesitermedio/panelviajesitermedio.component';
import { PanelViajerosModel } from '../../Core/Models/Generales/panelviajeros.model';
import { customLangService } from '../../Core/Services/customLang.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChildren(PanelviajesitermedioComponent) listComponentViajes: QueryList<PanelviajesitermedioComponent>;
  @ViewChild('refOrigen') refPanelOrigen : any;
  @ViewChild('refDestino') refPanelDestino : any;
  //@ViewChild('headermenus') refHeaderMenu : any;

  private logout : string;
  private storage : StorageService;
  private vUser : UserStorage;
  private customlang: customLangService;
  
  //ESTE DATO, ENVIA UN VALOR A COMPONENTE HIJO "LOGIN" QUE ES UN DESLOGEO PARA ELIMINAR LA SESSION
  public datoLogin:string;

  public confMultipunto = {'isOculto' : false , 'indice': 0, 'title': 'Parada ', 'tramo': 1 };

  public confOrigen  =  {'title' : 'Origen', 'verPersona' : true, 'idaYvuelta': true, 'btnFooter': false, 'titleMenuChanges': true };
  public confDestino =  {'title' : 'Destino', 'verPersona' : false, 'idaYvuelta': true, 'btnFooter': true, 'titleMenuChanges': true };

  public listMultipunto : any[] = [];
  private listModelPanel: PanelViajerosModel[] = [];

  public ngModelCountPasajeros: any;

  public tieneEmpresa: boolean = false;

	public isIda: boolean = false;
	public isVuelta: boolean = true;
	public isIdaVuelta: boolean = false;

  public options = [{
    'id' : '1',
    'isIntermedio' : false,
    'titulo' : 'Origen',
    obligatorio : {
      'fecha' : false,
      'hora' : false,
      'personas' : false
    },
    ocultar : {
      'noseCuandoSalgo' : false		
    }
  }];

  private tipoViaje: string;

 
  constructor(
    private navegacion:Router,
    private rutaActiva: ActivatedRoute
  ) { 

    this.customlang = new customLangService();
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);

    this.deleteStorage();
   
    this.logout = this.rutaActiva.snapshot.params.id;    
    this.vUser.setSession(this.storage.getCurrentSession());
    if(this.logout!=undefined){      
      this.datoLogin=this.logout;                
    }else{
      this.datoLogin="";
      if(this.vUser.getName() !== ''){
        //this.navegacion.navigate(['/homeviajeros/inicio']);
        this.tieneEmpresa = true;
      }
    }
    
  }
  ngAfterViewInit(): void {
    this.storage = new StorageService();
    if( this.storage.existData('solicitud') ){
      let data  = this.storage.loadData('solicitud');

      this.buidEditPanel( data.viaje ).then(( intermedio: any  )=>{

        if(intermedio.length > 0){

          // PANELES INTERMEDIOS
          this.listComponentViajes.forEach(( componente : PanelviajesitermedioComponent, index : number ) => {
             componente.setDatosInputs( intermedio[index] );
              if( index > 0 ){
              this.mostrarOcultarBtn().ocultarBtnMas();
             }
          });

        }

      }).catch((err)=>{
        console.log(err);
      });
    }		 

  }

 
  ngOnInit() {
  	this.storage = new StorageService();
		if( this.storage.getCurrentSession() != null ){
			this.vUser.setSession( this.storage.getCurrentSession() );
			if( this.vUser.getEmpresa() != '' && this.vUser.getEmpresa() != undefined ) {
				this.tieneEmpresa = true;
			}else{
				this.tieneEmpresa = false;
			}
    }
     
	}



  /** AÑADE NUEVO MULTIPUNTO
   * @Observations : Evento para añadir nuevo multipunto
   *
   */ 
  addMultipunto( obj : any){
      this.listMultipunto.push(obj);
  }
  
  delMultipunto(){
    this.listMultipunto.pop();
  }

  /** EVENTOS CLICK DE COMPONENTE HEADER MENU  */ 
  eventida(){
    this.refPanelDestino.ocultarFecha();
    this.listMultipunto = [];
    this.tipoViaje = 'ida';
		this.isIda = true;
		this.isVuelta = false;
		this.isIdaVuelta = false;
		this.listMultipunto = [];
		this.storage.removeData('solicitud');
  }

  eventIdaVuelta(){
    this.refPanelDestino.mostrarFecha();
    this.listMultipunto = [];
    this.tipoViaje = 'idavuelta';
		this.isIda = false;
		this.isVuelta = true;
		this.isIdaVuelta = false;
		this.listMultipunto = [];
		this.storage.removeData('solicitud');
  }
 
  multipunto(){
		this.isIda = false;
		this.isVuelta = false;
		this.isIdaVuelta = true;

    this.confDestino.titleMenuChanges = true;
    this.confOrigen.titleMenuChanges = true;
    this.refPanelDestino.mostrarFecha();
    this.listMultipunto = [];
		this.storage.removeData('solicitud');

    this.confDestino.idaYvuelta = true;
    if( this.listMultipunto.length == 0 || this.listMultipunto == undefined ){
      this.storage = new StorageService();
      this.vUser = new UserStorage('','','','','','','','','',false);
 	    this.vUser.setSession(this.storage.getCurrentSession());

			if( this.vUser.getID() != '' ){
 		    this.confMultipunto['title'] = this.customlang.wordLang('parada',this.vUser.getID());;
			}else{
 		    this.confMultipunto['title'] = this.customlang.wordLang('parada','es');
			}
			
      this.addMultipunto(this.confMultipunto);
    }
    this.tipoViaje = 'multipunto';
  }

  /** EVENTO "MÁS" MULTIPUNTO @OUTPUT  */
  newMultipunto(){
    if(this.listMultipunto.length == 0){
      this.addMultipunto(this.confMultipunto);
    }else{
      const newConf = {...this.confMultipunto};
      newConf.tramo = newConf.tramo + 1;
      this.storage = new StorageService();
      this.vUser = new UserStorage('','','','','','','','','',false);
      this.vUser.setSession(this.storage.getCurrentSession());      

			if( this.vUser.getID() != '' ){
				newConf.title = this.customlang.wordLang('parada',this.vUser.getID());
			}else{
 				newConf.title = this.customlang.wordLang('parada','es');
			}

      this.addMultipunto(newConf);
      this.mostrarOcultarBtn().ocultarBtnMas();
    }
  }

  /** EVENTO "ELIMINAR" MULTIPUNTO @OUTPUT*/
  delOldMultipunto(){
    if(this.listMultipunto.length > 1){
      this.delMultipunto();
      this.mostrarOcultarBtn().mostrarBtnMas();
    }
  }

  
  /* REDIRECCION A CARGA DE EMPRESA */
  cargaEmpresa(){
    this.navegacion.navigate(['/home-empresa']);
  }

  mostrarOcultarBtn(){
    return{
      ocultarBtnMas : ()=>{
        const cmp = this.listComponentViajes.filter( (x, i) => i == this.listMultipunto.length - 2);
        cmp[0].mostrasMas = false;
      },
      mostrarBtnMas : ()=>{
        const cmp = this.listComponentViajes.filter( (x, i ) => i == this.listMultipunto.length - 1 );
        cmp[0].mostrasMas = true;
      }
    }
  }


   /* RECUPERACION DE DATOS PARA LA API */
  consultBudget(){

		if ( this.validateDataComponent() ){
    
      if( this.validateDate( this.refPanelOrigen.getDataPanelViajeros().fecha , this.refPanelDestino.getDataPanelViajeros().fecha ) ){

        // PUSH OBJECT PANELS
        this.listModelPanel.push(this.refPanelOrigen.getDataPanelViajeros());
        if(this.listComponentViajes.length > 0){
          this.listComponentViajes.forEach((componente : PanelviajesitermedioComponent) => { 
             this.listModelPanel.push(componente.getDatePanelViajeros());
          });
        }
        this.listModelPanel.push(this.refPanelDestino.getDataPanelViajeros());

				let send = this.buildObjApi(this.listModelPanel);
				if ( send ){
          this.storage.setDataAny(send,'solicitud');
          // REDIRIGIMOS
					this.navegacion.navigate(['datosextra']);
				}
			}else{
				alert('Error, la fecha de origen no puede ser menor a la fecha de destino.');
			}
		 
		}else{
			alert('Existen datos incorrectos!!!');
		}
      
  }

  /** OBJETO PARA LA API JSON**/
  buildObjApi(model: any):any{
      let obj = {};
      this.storage = new StorageService();
      this.vUser = new UserStorage('es','','','','','','','','',false);
      this.vUser.setSession(this.storage.getCurrentSession());
			let dataSolicitud = this.storage.loadData('solicitud');
      obj['token'] = this.vUser.getToken();
      obj['nota'] = ( dataSolicitud ) ? dataSolicitud.nota : '';
      obj['viaje'] = [];
      obj['tipo'] = this.tipoViaje;

      const countViajeros = model.filter( ( viajes: any ) => viajes['countAdultos']);

      if(countViajeros.length > 0 ){
         obj['pasajeros'] = ''+countViajeros[0].countAdultos;
      }else{
        obj['pasajeros'] = "";
      }

      model.forEach( (value: any ) => {
        let objaux = {
          'ciudad' : value.nombre,
          'lat' : value.ciudad.lat,
          'lng' : value.ciudad.lng,
          'fecha' : value.fecha,
          'hora' : value.hora,
					'pasajeros' : countViajeros[0].countAdultos
        };

        obj['viaje'].push(objaux);

      });
      
      return obj;
  }


  /** DELETE LOCAL STORAGE **/
  deleteStorage(){
		this.storage.deleteFullStorage();
  }


  redirecEmpresa (){
    return {
      miEmpresa : ()=>{
       this.navegacion.navigate(['/home-empresa/dashboard/entrantes']);
      },
      sumaEmpresa : ()=>{
				this.storage = new StorageService();

				if( this.storage.getCurrentSession() != null ){
					this.vUser.setSession( this.storage.getCurrentSession() );

					if( this.vUser.getEmpresa() != '' && this.vUser.getEmpresa() != undefined ){
 			       this.navegacion.navigate(['/home-empresa/nuevaempresa']);
					}else{
						if( this.vUser.getToken() != '' ){
							this.navegacion.navigate(['/home-empresa/nuevaempresa']);
						}else{
 			       	this.navegacion.navigate(['/home-empresa/loginempresa']);
						}
					}
				}

      }
    }
  }

  /** EMITER DE NAVBAR TIENE EMRPESA **/
  isEmpresa(isEmpresa: boolean){
    this.tieneEmpresa = isEmpresa;
  }


  /** RECONSTRUIR EDITAR COMPONENTES **/
  buidEditPanel ( viajes: any ):Promise<void>{
    return new Promise((resolve, reject )=>{

			if( viajes.length == undefined ){
				reject();
      }
      
      let dataAux  = this.storage.loadData('solicitud');
			switch(dataAux.tipo){
        case 'ida':                   
					this.isIda = true;
					this.isVuelta = false;
					this.isIdaVuelta = false;
					this.refPanelDestino.ocultarFecha();

					break;
				case 'idavuelta':
					this.isIda = false;
					this.isVuelta = true;
					this.isIdaVuelta = false;
					this.refPanelDestino.mostrarFecha();

					break;
				case 'multipunto' : 
					this.isIda = false;
					this.isVuelta = false;
					this.isIdaVuelta = true;
					this.refPanelDestino.mostrarFecha();

					break;
      }
      
      setTimeout( ()=>{
        // PANEL ORIGEN
        this.refPanelOrigen.setDatosInputs(viajes[0]);
        // PANEL DESTINO
        this.refPanelDestino.setDatosInputs(viajes[viajes.length-1]);

        let intermedio : any = [];
        if ( viajes.length > 1 ){

          this.listComponentViajes.changes.subscribe((componentes: QueryList<PanelviajesitermedioComponent>)=> { 
            resolve( intermedio );
          });        

          viajes.forEach((value, indice: number) => {
            if (indice >= 1 && indice < viajes.length -1 ){
                this.addMultipunto(this.confMultipunto);
                intermedio.push(value);
            }
          });

        }else{

        resolve(intermedio);

        }
      },100)
			

    });
  }


	/** VALIDO FECHAS 
	* @Observations : validacion de fecha origen y destino
	* @params fechaOrigen
	* @params fechaDestino
	*/
	validateDate( origen : any, destino : any ): boolean {
		let origenDate = new Date(origen);
		let destinoDate = new Date(destino);
		if( destino == '-' ){
			return true;
		}
		return ( origenDate.getTime() <= destinoDate.getTime() ) ? true : false;
  }
  
  /** VALIDA CAMPOS DE LOS VIAJES
   * @Observations : recorre componente a componente validando cada unos de los inputs
   * @returns boolean ( true or false) 
   */
  validateDataComponent():boolean{
    let validateDatos : boolean = true;
		let listValidateDatos = new Array<boolean>();

		if( this.refPanelOrigen.validateInputs('origen') ){			
			 validateDatos = true;
		}else{
			validateDatos = false;
		}
    
    if(this.listComponentViajes.length > 0){
      this.listComponentViajes.forEach((componente : PanelviajesitermedioComponent, index) => { 
				if( this.listComponentViajes.length -1 == index ){
				 listValidateDatos.push( componente.validateInputs(true) );
				}else{
				 listValidateDatos.push( componente.validateInputs() );
				}
      });
    }

		if( this.refPanelDestino.validateInputs('destino') ){			
			if(!validateDatos){
				validateDatos = false;
			}else{
				validateDatos = true;
			}
		}else{
			validateDatos = false;
    }

		//SI TENGO ALGUN INTERMEDIO CON ERROR RETORNO EL FALSE.
		listValidateDatos.forEach( ( value ) =>{
			if( !value ) validateDatos = value;
		});

    return validateDatos;
  }

}


/* MOSTRARBTNMAS
 *
 * this.istComponentViajes.forEach((componente : PanelviajesitermedioComponent, indice ) => {
  if( indice == this.listMultipunto.length -1){
    componente.mostrasMas = true;   
    console.log('tramo compo : ',componente.tramo);
  }
});*/

/* OCULTARBTNMAS
 *
 * this.listComponentViajes.forEach((componente : PanelviajesitermedioComponent, indice ) => {
  if( indice == this.listMultipunto.length -2 ){
    componente.mostrasMas = false;   
  }
});*/   /*loadComponent(){ const Origen = this.createComponent(PanelviajesComponent); Origen.instance.optionsComponent(this.options); this.options[0].titulo = 'Destino'; const Destino = this.createComponent(PanelviajesComponent); Destino.instance.optionsComponent(this.options); Destino.instance.propagar.subscribe((e: any) => { console.log('Soy el padre nuestro : ', e); }); //this.refContainer.clear(); } */ /* CREAR COMPONENTE DINAMICO //private componentFactoryResolve: ComponentFactoryResolver // REFERENCIA AL TEMPLATE A DONDE SE CARGARA EL COMPOENTE DINAMICO
  //@ViewChild('appDynamicHost', {static: true, read: ViewContainerRef}) refContainer: ViewContainerRef;

  * @Observations : Metodo que crea componentes dinamicos.
  * @param componente component a instanciar.
  */ 
  /*createComponent (componente : any ):any {
    const cmp = this.refContainer.createComponent( this.componentFactoryResolve.resolveComponentFactory(componente) );
    cmp.changeDetectorRef.detectChanges();
    return  cmp;
  } */

 /*recorereComponentes(){
    //Obtener indice : const comp = this.listComponentViajes.toArray()[indice];
    //y de ahi llamar a un metodo por ejemplo del mismo.
    //comp.voltearCOlor();
    //Ahora recorremos lista.
    this.listComponentViajes.forEach((componente : PanelviajesitermedioComponent, indice ) => { console.log(componente.dataModel());
      console.log(componente, indice);
    });
  }*/
 // ngAfterViewInit
   /* this.listComponentViajes.changes.subscribe((componentes: QueryList<PanelviajesitermedioComponent>)=> { 
      componentes.forEach(componentes => {
        //ITERAMOS LOS ELEMENTOS
      //  console.log(componentes);
      });
    });*/

