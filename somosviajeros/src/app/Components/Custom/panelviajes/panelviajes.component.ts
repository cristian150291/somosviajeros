import { Component, OnInit, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { PanelViajerosModel } from '../../../Core/Models/Generales/panelviajeros.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panelviajes',
  templateUrl: './panelviajes.component.html',
  styleUrls: ['./panelviajes.component.sass']
})
export class PanelviajesComponent implements OnInit{

  @Input() title: string;
  @Input() verPersona: boolean ;
  @Input() idaYvuelta: boolean ;
  @Input() btnFooter: boolean;
  @Input() titleMenuChanges: boolean;
  @ViewChild('disFecha') disabledFecha: any;
  @ViewChild('disHora') disabledHora: NgbTimepickerConfig;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('disBtn') disBtn: any;
	@ViewChild('inputGoogle') refGoogle: any;

  public titleMenuChico: string = 'Ida y Vuelta';
  public panelModel: PanelViajerosModel;
  public model: NgbDateStruct;
  public time: NgbTimeStruct;
  public ciudad: any;
  public nombre: any;
  public ngModelCountPasajeros: any ;
	public errorHora : string = '';
	public errorFecha : string = '';
	public errorCiudad : string = '';
	public errorCountPasajeros : string = '';

  constructor(
    private config: NgbTimepickerConfig
  ) { 
    this.panelModel = new PanelViajerosModel('','','','','','');

    this.config.seconds = false;
  }

  ngOnInit(): void {
  }

  /**PUEDE QUE ESTO NO HAGA FALTA */
  handleAddressChange(address: Address) {
    this.ciudad = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng()};
    this.nombre = address.name;
  }


	/** VALIDAR INPUTS
	* @Observations : valida que todos los datos esten vargados.
	*
	* @returns boolean :  ( true or false ) 
	*/ 
	validateInputs( tipo : string = null ):boolean {
		let validate : boolean = true;

		if( tipo == 'origen' ){
			validate = ( this.ngModelCountPasajeros > 0 || this.ngModelCountPasajeros != undefined ) ? true : false;
			this.errorCountPasajeros = ( !validate ) ? 'Por favor ingresar pasajeros.' : '';
			if( !validate ) return validate;
		}

		validate = ( this.nombre != undefined && this.nombre != '' ) ? true : false;
		this.errorCiudad = ( !validate ) ? 'Por favor seleccione una  ciudad.' : '';
		if( !validate ) return validate;

		if (!this.disabledFecha.nativeElement.disabled ){

			validate = ( this.model ) ? true : false;
			this.errorFecha = ( !validate ) ? 'Por favor digite la fecha.' : '';
			if( !validate ) return validate;

      validate = ( this.time ) ? true : false;
			this.errorHora = ( !validate ) ? 'Por favor digite la hora.' : '';
		}

		return validate;
	}

	/**  RETORNA DATOS DEL COMPONENTE
	* @Observations : Retorna todos los datos cargador por el usuario.
	*
	* @returns PanelViajerosModel : modelo de  dato de panel viajes.
	*/
  getDataPanelViajeros():PanelViajerosModel { 
    if (!this.disabledFecha.nativeElement.disabled ){
      if( this.time != undefined && this.model != undefined ){
        let hora = ('0'+ this.time.hour.toString()).slice(-2)+':'+('0'+this.time.minute.toString()).slice(-2);
        this.panelModel.hora = hora;
        this.panelModel.fecha =  `${this.model.year.toString()}-${this.model.month.toString()}-${this.model.day.toString()}`; 
      }else{
        let fecha = new Date();
        this.model = {day: fecha.getDate(), month: fecha.getMonth() + 1, year: fecha.getFullYear()};
        this.time = {hour: fecha.getHours(), minute : fecha.getMinutes(), second : fecha.getSeconds()};
      }
    }else{
      this.panelModel.hora = '-';
      this.panelModel.fecha = '-';
    }

    if ( this.ciudad != undefined ){
      this.panelModel.ciudad = this.ciudad;
      this.panelModel.nombre = this.nombre;
    }else{
      this.panelModel.ciudad = {lat: 0, lng : 0};
    }

    if (this.ngModelCountPasajeros){
      this.panelModel.countAdultos = this.ngModelCountPasajeros;
    }else {
      this.panelModel.countAdultos = '0';
    }
       return this.panelModel;
  }

  ocultarFecha (){
    this.disabledFecha.nativeElement.disabled = true;
    this.disBtn.nativeElement.disabled = true;
    this.disabledHora.disabled = true;
		this.model = { year : undefined, month : undefined, day : undefined };
		this.time = { hour : undefined, minute : undefined, second : undefined };

  }

  mostrarFecha (){
    this.disBtn.nativeElement.disabled = false;
    this.disabledFecha.nativeElement.disabled = false;
    this.disabledHora.disabled = false;
  }

 	/** SET VALORES INPUTS
	 * @Observations : Este metodo recorre los inputs del componente y vuelve
	 * a setear los datos pasados por parametros.
	 *
	 * @param viaje : Object
	 */ 
	setDatosInputs( viaje: any ):void {		
		let splitFecha = viaje.fecha.split('-');
		let fecha = new Date(parseInt( splitFecha[0] ), parseInt( splitFecha[1] ), parseInt( splitFecha[2] ));
		let splitHourSec = viaje.hora.split(':');
		this.refGoogle.nativeElement.value = viaje.ciudad;
		this.nombre = viaje.ciudad;
		fecha.setHours(parseInt(splitHourSec[0]));
		fecha.setMinutes(parseInt(splitHourSec[1]));
	  
		//if ( this.model == undefined ){ 
      //setTimeout(function(){ 
        if( viaje.pasajeros > 0 && viaje.pasajeros != undefined ){
          this.ngModelCountPasajeros = viaje.pasajeros;
        }
        this.model = {day: fecha.getDate(), month: fecha.getMonth(), year: fecha.getFullYear()};  
        this.time = { hour: fecha.getHours(), minute: fecha.getMinutes() , second : 1 };
		    this.ciudad = { lat : viaje.lat , lng : viaje.lng };
      //});
			
		//}	

	}
	
	beforeFocus():void{
		if( this.refGoogle.nativeElement.value == '' ){
			this.nombre = '';
			this.ciudad = {};
		}
	}

} 
