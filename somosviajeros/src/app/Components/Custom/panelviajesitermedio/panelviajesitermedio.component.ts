import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { PanelViajerosModel } from '../../../Core/Models/Generales/panelviajeros.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-panelviajesitermedio',
  templateUrl: './panelviajesitermedio.component.html',
  styleUrls: ['./panelviajesitermedio.component.sass']
})
export class PanelviajesitermedioComponent implements OnInit, AfterViewInit {

  @Output() addMultipunto = new EventEmitter<any>();
  @Output() delMultipunto = new EventEmitter<any>();
  @Input() title: string;
  @Input() tramo: number;
  @Input() indice: number;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
	@ViewChild('inputGoogle') refInputGoogle: any;

  public datosViaje: PanelViajerosModel;
  public mostrasMas: boolean = true;
  public panelModel: PanelViajerosModel;
  public model: NgbDateStruct;
  public time: NgbTimeStruct;
  private ciudad: any;
  private nameCiudad: any= '';
  private isCheckFields: boolean = false;
	public errorCiudad : string = '';
	public errorHora : string = '';
	public errorFecha : string = '';

  constructor(
    private config : NgbTimepickerConfig
  ) {
    this.panelModel = new PanelViajerosModel('', '', '', '', '','');
    this.config.seconds = false;
  }

  ngOnInit(): void {
  }

	ngAfterViewInit (){
	}

  handleAddressChange(address: Address){
    this.ciudad = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng()};
    this.nameCiudad = address.name;
  }

  addNewMultipunto(event: any){
    this.addMultipunto.emit(event);
  }

  deleteMultipunto(event: any){
    this.delMultipunto.emit(event);
  }

  dataModel(): PanelViajerosModel {
    return this.datosViaje;
  }

	/** VALIDAR INPUTS 
	* @Observations : valida todos los inputs cargados
	* @returns boolean : ( true or false )
	*
	*/
	validateInputs(finalComponent = false):boolean{
		let validate : boolean = true;
			
		validate = ( this.nameCiudad != undefined && this.nameCiudad != '' ) ? true : false;
		this.errorCiudad = ( !validate ) ? 'Por favor seleccione una ciudad.' : '';
		if( !validate ) return validate;

		//SI ES EL ULTIMO MULTIPUNTO VALIDO LA FECHA.
		if( finalComponent ){

			validate = ( this.model != undefined ) ? true : false;
			this.errorFecha = ( !validate ) ? 'Por favor digite la fecha.' : '';
			if( !validate ) return validate;

			validate = ( this.time != undefined ) ? true : false;
			this.errorHora = ( !validate ) ? 'Por favor digite la hora.' : '';
			if( !validate ) return validate;

		}

		return validate;
	}

  getDatePanelViajeros():PanelViajerosModel { 
    if( this.time != undefined && this.model != undefined ){
      let hora = ('0'+ this.time.hour.toString()).slice(-2)+':'+('0'+this.time.minute.toString()).slice(-2);
      this.panelModel.hora = hora;
      this.panelModel.fecha = `${this.model.year.toString()}-${this.model.month.toString()}-${this.model.day.toString()}`; 
    }

    if (this.ciudad != undefined ){
      this.panelModel.ciudad = this.ciudad;
      this.panelModel.nombre = this.nameCiudad;
    }else{
       this.panelModel.ciudad = { lat: 0, lng: 0 };
    }
       return this.panelModel;
  }

  /** VALIDAR INPUTS
  * @Observations : Metodo para validar que todos los inputs esten completos, 
  * en caso de tener algun input que no deba de tener datos obligatorios los seteamos
  * con datos falsos que no deben de tomarse en cuenta.
  **/
  checkFields():boolean {
    if(this.time) this.isCheckFields = true;
    if(this.ciudad) this.isCheckFields = true;
    if(this.model) this.isCheckFields = true;

    return this.isCheckFields;
  }

	/** SET VALORES INPUTS
	 * @Observations : Este metodo recorre los inputs del componente y vuelve
	 * a setear los datos pasados por parametros.
	 *
	 * @param viaje : Object
	 */ 
	setDatosInputs( viaje: any ):void {
		let fecha = new Date(viaje.fecha);
		let splitHourSec = viaje.hora.split(':');
		this.refInputGoogle.nativeElement.value = viaje.ciudad;
		this.nameCiudad = viaje.ciudad;
		this.model = {day: fecha.getUTCDate(), month: fecha.getUTCMonth() + 1, year: fecha.getUTCFullYear()};
		fecha.setHours(parseInt(splitHourSec[0]));
		fecha.setMinutes(parseInt(splitHourSec[1]))
	  this.time = { hour: fecha.getHours(), minute: fecha.getMinutes() , second : 1 };
		this.ciudad = { lat : viaje.lat , lng : viaje.lng };
	}
 
	//BLUR EVENT CIUDAD
	beforeFocus():void{
		if( this.refInputGoogle.nativeElement.value == '' ){
			this.nameCiudad = '';
			this.ciudad = {};
		}
	}

}
