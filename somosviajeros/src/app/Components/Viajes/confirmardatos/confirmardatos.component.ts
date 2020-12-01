import { Component, OnInit, ViewChild } from '@angular/core';
 //SERVICE GET TRAVEL REQUEST
import { TravelRequestService } from '../../../Core/Services/Usuario/travelRequest.service';
import { StorageService } from '../../../Core/Services/storage.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { Router } from '@angular/router';
import { fechasLangService  } from '../../../Core/Services/fechasLang.service';

@Component({
  selector: 'app-confirmardatos',
  templateUrl: './confirmardatos.component.html',
  styleUrls: ['./confirmardatos.component.sass'],
  providers: [ TravelRequestService  ]
})
export class ConfirmardatosComponent implements OnInit {
  
  private storage: StorageService;
  private vUser: UserStorage;
  public lat = 24.799448;
  public lng = 120.979021;
  public marker : any[];
  public data: any[] = [];
  public sizeViaje: number;
  public dataVintermedio: any[];
  public fechaslang : fechasLangService;

  @ViewChild('refNavBar') referenciaNavBar : any;

  constructor(
    private _sendTravelRequest: TravelRequestService,
    private navegacion : Router
  ) {  
      this.storage = new StorageService();
      this.fechaslang = new fechasLangService();
    }

  ngOnInit(): void {
    if(this.storage.existData('solicitud')){
      this.data.push(this.storage.loadData('solicitud'));
      this.sizeViaje = this.data[0].viaje.length - 1;
      this.dataVintermedio = this.buildMediun(this.data[0].viaje);
      this.marker = this.buidMarkerViewMap(this.storage.loadData('solicitud').viaje);
    }
  }

  sendConfirmacion(){

    this.storage = new StorageService();
    this.vUser = new UserStorage('es', '', '', '', '', '', '', '', '', false);
    this.vUser.setSession(this.storage.getCurrentSession());
    if (this.vUser.getName() != ''){
      this.enviarSolicitud();
    }else{
      //LLAMAMO A INICIAR SESSION
      this.referenciaNavBar.showModalLogin();
    }

  }

  /** Recibo mensaje de loginSuccess**/
  successLogin(isLogin: boolean){
    if (isLogin){
     this.enviarSolicitud();
    }
  }

  enviarSolicitud(){

    this.storage = new StorageService();
    if(this.storage.existData('solicitud')){

      let send = this.builSend(this.storage.loadData('solicitud'));
      this.vUser = new UserStorage('es', '', '', '', '', '', '', '', '', false);
      this.vUser.setSession(this.storage.getCurrentSession());
      send.token = this.vUser.getToken();
        this._sendTravelRequest.sendTravelRequest(send,'dat').subscribe(
          reponse => {
            if (reponse.error == ''){
              this.vUser.setToken(reponse.token);
              this.storage.setCurrentSession(this.vUser);
              this.storage.removeData('solicitud');
              alert('Solicitud enviada con exito');
              this.navegacion.navigate(['/home']);
            }else {
              alert('Error al realizar la solicitud ');
              this.vUser.setToken(reponse.token);
              this.storage.setCurrentSession(this.vUser);
            }
          },
          error => {
            console.error('Error Sercer : ',error);
          }
       );
    }else{
      alert('No hay solicitud para enviar!!');
    }

  }


  /**PREPARO DATOS PARA ENVIAR A LA API**/
  builSend (obj: any): any {
    let objAux = {};
    objAux['viaje'] = [];
		console.log('pase por donde no quiero');
    obj.viaje.forEach( (value: any ) => {
      let objAux2 =  {
          'lat' : value.lat,
          'lng' : value.lng,
          'fecha' : value.fecha,
          'hoka' : value.hora
        };

      objAux['viaje'].push(objAux2);
    });

    obj.viaje = objAux['viaje'];

    return obj;
  }

  /** CONSTRUYE MARKADORES PARA MOSTRAR EN EL MAPA.
   *@param Array : List de marcadores del local storage.
   */
  buidMarkerViewMap (marcadores: any[]):any[]{
    let paradas: any [] = [];
    marcadores.forEach((value , index) => {
      if(index + 1 < marcadores.length) {
          paradas.push( { origin : {lat : value.lat, lng : value.lng }, destination : { lat : marcadores[index +1].lat, lng : marcadores[index + 1].lng } });
      }
    });
    return paradas;
  }

  /** PARADAS INTERMEDIAS **/
  buildMediun (marcadores: any[]):any[] {
    let paradas: any [] = [];
    marcadores.forEach(( value, index) => {
      if(index >= 1 && index < marcadores.length -1) {
        paradas.push({
          'ciudad' : value.ciudad,
          'fecha' : value.fecha,
          'hora' : value.hora
        });
      }
    });

    return paradas;
  }

  getHourFecha (fecha = null){

    let fechaCompleta: string;

    if( fecha != null && fecha != '' && fecha != undefined ){
      this.storage = new StorageService();
      this.vUser = new UserStorage('es','','','','','','','','',false);
      this.vUser.setSession(this.storage.getCurrentSession());

      let date = new Date(fecha);
      let dia = this.fechaslang.diasLang(date.getDay().toString(),this.vUser.getID());
      let mes = date.getDate();
      let nMes = this.fechaslang.mesesLang(date.getMonth().toString(), this.vUser.getID());

      fechaCompleta = `${dia} ${mes} , ${nMes}`;
    }else{
      fechaCompleta = 'Sin fecha.';
    }
   
    return {
      getHora : ( hora: any)=>{
        if ( hora != '' && hora != undefined ) return `${hora} hs.`;
        return 'Sin hora.';
      },
      getFecha : ()=>{
        return fechaCompleta;
      }
    }
  }


	editTravel(){
		this.navegacion.navigate(['/home']);
	}

}

