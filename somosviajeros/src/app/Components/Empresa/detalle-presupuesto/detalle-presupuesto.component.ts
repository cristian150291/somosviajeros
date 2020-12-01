import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.sass']
})
export class DetallePresupuestoComponent implements OnInit {
  public idPresupuesto: string;
  public lat = 24.799448;
  public lng = 120.979021;
  public rutasMarker: any[] = [];
  public dataDetalle: any;
  public general: any;
  public itinerario: any;
  
  public mosIda:number;        
  public idaTotal:boolean;           // SI MOSTRAR 
  public totalItiIda:number;         // TOTAL ITINERAIO IDA

  public mosVue:number;
  public vueTotal:boolean;
  public totalItiVue:number;         // TOTAL ITINERIO VUELTA
 
  public origin: any;
  public destination: any;
  constructor(
      private activeRoute: ActivatedRoute
  ) {
    this.idPresupuesto = this.activeRoute.snapshot.params.id;
    // SIMULACION DE LA DATA DEL DETALLE, SE DEBE SOLICITAR CON EL ID AL SERVER.
    this.loadDataDetalle();
    this.mosIda = 3;
    this.idaTotal = false;
    this.totalItiIda = this.dataDetalle.itinerario.ida[0].data.length;

    this.mosVue = 3;
    this.vueTotal = false;
    if (this.dataDetalle.itinerario.vuelta != '') {
      this.totalItiVue = this.dataDetalle.itinerario.vuelta[0].data.length;
    }    
  }

  ngOnInit(): void {    
    // DESEREALIZACION DE DATA DE PETICION "DETALLE PRESUPUESTO"
    this.rutasMarker = this.dataDetalle.puntos;
    this.general = this.dataDetalle.general;
    this.itinerario = this.dataDetalle.itinerario;
  }

  /** MUESTRA O OCULTA TODA ITINERARIO IDA   
   */
  mostrarIdaTotal(){    
    if(this.idaTotal == false){
      this.mosIda = this.totalItiIda ;
      this.idaTotal = true;
    } else{
      this.mosIda = 3;
      this.idaTotal = false;
    }
  }

  /** MUESTRA O OCULTA TODO EL ITINERARIO VUELTA
   */
  mostrarVueltaTotal(){    
    if(this.vueTotal == false){
      this.mosVue = this.totalItiIda ;
      this.vueTotal = true;
    } else{
      this.mosVue = 3;
      this.vueTotal = false;
    }
  }
  

  loadDataDetalle (){
    this.dataDetalle = 
      {
        puntos :[{
                  origin : {lat: -34.5618722, lng: -59.1143605},
                  destination : {lat: -34.7860649, lng: -58.3469797 }
                 },
                 {
                  origin : {lat: -34.7860649, lng: -58.3469797},
                  destination : {lat: -34.926498, lng: -57.978027 }
                 },
                 {
                  origin : {lat: -34.926498, lng: -57.978027 },
                  destination : {lat: -38.574279, lng: -58.695052 }
                 },
                 {
                  origin : { lat: -38.574279, lng: -58.695052 } , 
                  destination : {lat: -38.552904, lng: -58.772462 }
                 }
                ],
        general :                 
                [{
                  ida : {
                    dia : '15',
                    mes : 'Febrero',
                    ciudadInicial: 'Lujan',
                    provinciaInicial: 'Buenos Aires' ,
                    horaSalidaInicial: '18:00' ,
                    ciudadFinal: 'Necochea' ,
                    provinciaFinal: 'Rio Negro' ,
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
                  km : '309',
                  tm : '8:30',
                  vehiculo : 'VAN',
                  img : 'url',
                  cantMenores: '50',
                  cantMayores: '10',
                  cantTotal: '60'
                }],
        itinerario : {
          ida : [{  
                  data : [{
                          hora : '16',
                          ciudad : 'lujan',
                          provincia : 'Buenos Aires',
                          cantidad : '20'
                        },
                        {
                          hora : '20',
                          ciudad : 'La Plata',
                          provincia : 'Buenos Aires',
                          cantidad : '43'
                        },
                        {
                          hora : '03',
                          ciudad : 'Mercedez',
                          provincia : 'Buenos Aires',
                          cantidad : '5'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        },
                        {
                          hora : '03',
                          ciudad : 'Mercedez',
                          provincia : 'Buenos Aires',
                          cantidad : '5'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        },
                        {
                          hora : '06',
                          ciudad : 'Necochea',
                          provincia : 'Buenos Aires',
                          cantidad : '6'
                        }
                      ],

                   dia : '27',
                   mes : 'Sep'
                }],

          vuelta : [{
                        data : [{
                          hora : '18',
                          ciudad : 'Necochea',
                          provincia : 'Buenos AIres',
                          cantidad : '0'
                        },
                        {
                          hora : '23',
                          ciudad : 'La plata',
                          provincia : 'Buenos Aires',
                          cantidad : '23'
                        },
                        {
                          hora : '04',
                          ciudad : 'Mercedez',
                          provincia : 'Buenos Aires',
                          cantidad : '32'
                        },
                        {
                          hora : '16',
                          ciudad : 'Lujan',
                          provincia : 'Buenos Aires',
                          cantidad : '17'
                        }
                      ],

                   ida : 'dia',
                   mes : 'mes'
          }]                
        },

        id : 'id002',
        nombre : 'Nombre del Asociado',
        nota : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur et illo iste unde. Aspernatur deserunt ipsam laborum obcaecati officiis soluta veritatis vero voluptatem. Ab architecto aut, cumque eius esse ex explicabo fugit laborum minima molestias natus possimus praesentium vel!'        

      }
  }
}
