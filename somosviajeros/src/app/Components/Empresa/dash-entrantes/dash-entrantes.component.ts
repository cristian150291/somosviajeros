import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../Core/Services/Empresa/dashboard.service';
import { Router, NavigationEnd, RouteConfigLoadStart } from '@angular/router';

@Component({
  selector: 'app-dash-entrantes',
  templateUrl: './dash-entrantes.component.html',
  styleUrls: ['./dash-entrantes.component.sass'],
  providers : [ DashboardService ]
})
export class DashEntrantesComponent implements OnInit {

  public presupuestosEntrantes: any[] = [];
  public hayEntrantes:boolean=false;
  public interval:any=null;
  public intervalBool:boolean=false;

  constructor(
      // tslint:disable-next-line:variable-name
      private _dashServices: DashboardService,
      private navegacion: Router
  ) {
    // PETICION DE PRESUPUESTOS ENTRANTES.
    this.cargarPresupuesto();  // Esto suplantaria a la peticion ral del service      
    navegacion.events.subscribe((e)=>{      
      if(e instanceof NavigationEnd){        
        if(e.url!="/home-empresa/dashboard/entrantes"){
          if(this.intervalBool){            
            this.intervalBool=false;
            clearInterval(this.interval);
          }
        }                
      }
    });

    this.refrescarPresupuesto();    
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  cargarPresupuesto(){
    // POR AHORA NO VAMOS A MOTRAR NADA, SETEO "HAY ENTRANTES EN FALSE HASTA QUE TENGAMOS DEFINIDO QUE VAMOS A MOSTRAR."
    this.hayEntrantes = false;
    this.presupuestosEntrantes.push({
      ida : {
        dia : '15',
        mes : 'Febrero',
        ciudadInicial: 'Lujan',
        provinciIncial: 'Buenos Aires' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'San Carlos de Bariloche' ,
        provinciaFianl: 'Rio Negro' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '16',
        mesllegada : 'Febrero',
        paradas: '5'
      },
      vuelta : {
        dia : '25',
        mes : 'Marzo',
        ciudadInicial: 'Bariloche',
        provinciIncial: 'Rio Negro' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'Lujan' ,
        provinciaFinal: 'Buenos Aires' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '1',
        mesllegada : 'Abril',
        paradas: 'Directo'
      },
      id : '22222',
      cantidadAdultos: '3',
      cantidadNinios: '28',
      nombreUsuario : 'Daniel Agostini',
      tiempoRespuesta : '2'

    });

    this.presupuestosEntrantes.push({
      ida : {
        dia : '15',
        mes : 'Febrero',
        ciudadInicial: 'Lujan',
        provinciIncial: 'Buenos Aires' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'San Carlos de Bariloche' ,
        provinciaFianl: 'Rio Negro' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '16',
        mesllegada : 'Febrero',
        paradas: '5'
      },
      vuelta : {
        dia : '25',
        mes : 'Marzo',
        ciudadInicial: 'Bariloche',
        provinciIncial: 'Rio Negro' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'Lujan' ,
        provinciaFinal: 'Buenos Aires' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '1',
        mesllegada : 'Abril',
        paradas: 'Directo'
      },
      id : '22222',
      cantidadAdultos: '3',
      cantidadNinios: '28',
      nombreUsuario : 'Daniel Agostini',
      tiempoRespuesta : '2'

    });

    this.presupuestosEntrantes.push({
      ida : {
        dia : '15',
        mes : 'Febrero',
        ciudadInicial: 'Lujan',
        provinciIncial: 'Buenos Aires' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'San Carlos de Bariloche' ,
        provinciaFianl: 'Rio Negro' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '16',
        mesllegada : 'Febrero',
        paradas: '5'
      },
      vuelta : {
        dia : '25',
        mes : 'Marzo',
        ciudadInicial: 'Bariloche',
        provinciIncial: 'Rio Negro' ,
        horaSalidaInicial: '18:00' ,
        ciudadFinal: 'Lujan' ,
        provinciaFinal: 'Buenos Aires' ,
        horaLlegadaFinal: '10:00' ,
        diallegada : '1',
        mesllegada : 'Abril',
        paradas: 'Directo'
      },
      id : '22222',
      cantidadAdultos: '3',
      cantidadNinios: '28',
      nombreUsuario : 'Daniel Agostini',
      tiempoRespuesta : '2'

    });

    this.presupuestosEntrantes.push({
      ida : {
        dia : '18',
        mes : 'Enero',
        ciudadInicial: 'Lujan',
        provinciIncial: 'Buenos Aires' ,
        horaSalidaInicial: '12:00 hs' ,
        ciudadFinal: 'Caviahue' ,
        provinciaFianl: 'Mendoza' ,
        horaLlegadaFinal: '19:00 hs' ,
        diallegada : '28',
        mesllegada : 'Enero',
        paradas: '10'
      },
      id : '11111',
      vuelta : '' ,
      cantidadAdultos: '58',
      cantidadNinios: '11',
      nombreUsuario : 'Angelina Jouli',
      timpoRespuesta : '5 horas'
    });
  }
  // tslint:disable-next-line:typedef
  /**VER PRESUPUESTO
   * @Observations Este es un metodo click que captura la vista de algun
   * presupuesto cargado en "presupuesto de entrada", el mismo redirige
   * a la pantalla de "DETALLE" en donde se carga el mismo con todos sus datos.
   * @param id Identificador del presupuesto.
   */
  // tslint:disable-next-line:typedef
  verPresupuesto(id){    
    this.navegacion.navigate(['/home-empresa/detalle/presupuesto/' + id]);
  }

  /** REFRESCO CARGA DE DATOS ENTRANTES.
   * @Observations Creo un preceso que se ejecuta cada cierto tiempo
   * para actualizar los datos entrantes de presupuestos de los clientes. 
   * Al realizar el cambio de ruta elimino el proceso para que siga rentabilizando la app.
   */
  refrescarPresupuesto(){
    this.intervalBool=true;
    this.interval = setInterval(()=>{            
      this.cargarPresupuesto();      
      console.log("asdasd");
    },300000);
  }

}
