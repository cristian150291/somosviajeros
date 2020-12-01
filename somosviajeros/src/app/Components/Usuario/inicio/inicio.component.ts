import { Component, OnInit } from '@angular/core';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';
import { Router } from '@angular/router';
import { DatosEmpresaService } from '../../../Core/Services/datosempresa.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass'],
  providers: [ DatosEmpresaService ]
})
export class InicioComponent implements OnInit {

  public tieneEmpresa: boolean ;          // ESTE BOOL GUARDA SI EL USER QUE SE LOGEO TIENE EMPRESA ASIGNADA TAMBIEN.
  public storage: StorageService;
  public vUser: UserStorage;
  public userActive: boolean;             // USER ACTIVO ES QUE REALMENTE TENGO UN USUARIO CARGADO EN EL LOCAL STORAGE
  public userName: string;                // USER NAME GUARDA NOMBRE DE USUARIO PARA MOSTRARLO EN EL HEADER UNA VEZ LOGEADO
  interval: any;

  constructor(
    private navegacion: Router,
    private _dataEmp: DatosEmpresaService
  ) {
        
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    this.storage = new StorageService();
    if (this.storage.getCurrentSession() == null){
      this.userActive = false;
    }else{
      this.vUser = new UserStorage('', '', '', '', '', '', '', '', '', false);
      this.vUser.setSession(this.storage.getCurrentSession());      
      this.storage.setCurrentSession(this.vUser);
      this.userActive = true;
      if(this.vUser.getEmpresa() != ""){
        this.tieneEmpresa = true;
      }else{
        this.tieneEmpresa = false;
      }
    }

    if ( this.tieneEmpresa ) {
			this.buildMarkerEnterprise();
    }

  }

  ngOnInit(): void {
    if (this.userActive){
      this.userName = this.vUser.getName();
    }    
  }

  sumaEmpresa(){
    this.navegacion.navigate(['/home-empresa/nuevaempresa']);
  }

  miEmpresa(){
    this.navegacion.navigate(['/home-empresa/dashboard/entrantes']);
  }

  /** CONSTRULLO ARRAY DE SUCURSALE O PUNTOS DE REPO, AL LOCAL STORAGE.
   * @Observations Si detectamos que este usuario tiene empresa, realizamos la consulta
   * para obtener los datos completos del mismo, y armar toda la data de user o empresa en el
   * local storage para uso rapido del sistema.
   */
  buildMarkerEnterprise (){
    this._dataEmp.getDatosEmp().subscribe(
	response => {
	  if(response.error == ''){
	    //GUARDAMOS TOKEN DEVUELTO.
	    this.vUser.setToken(response.token);
	    this.vUser.setPreposicion(response.datossuc);
	    this.storage.setCurrentSession(this.vUser);
	  }
	},
	error => {
	  // ERROR SOLO PARA DESARROLLADOR.
	  console.log("getDatosEmpresa : ", error);
    });
  }


}

/*
 * loadComponent(){
    const componente = this.componentFactoryResolve.resolveComponentFactory(PanelviajesComponent);
    const origen = this.refContainer.createComponent(componente);
    origen.changeDetectorRef.detectChanges();
    origen.instance.optionsComponent(this.options);
   
    console.log(typeof origen);

    const componente2 = this.componentFactoryResolve.resolveComponentFactory(PanelviajesComponent);
    const destino = this.refContainer.createComponent(componente2);
    destino.changeDetectorRef.detectChanges();
    this.options[0].titulo = 'Destino';
    destino.instance.optionsComponent(this.options);

    destino.instance.propagar.subscribe((e) => {
      console.log('Soy el padre nuestro : ', e);
    });

    const prueba = this.createComponent(PanelviajesComponent);

    //this.refContainer.clear();

  }
  

<componeteoriginar
  [options]="options"
></com...>
<commultipunti *ngIf="isMultipunto" *ngFor="let ... item of properties " [{ props:[{algo : '',otra:''}]},{},{}]
  (propagar)="metodoAddCompoenteMultipunto"
  [ocultar] = "item.isOculto"
><com...>
<componeteoriginar
 [fechaOcultar]="isIda"
></com...>

props = [
   {cosas : '', cosas2: '', cosas3: ''}
]

propiedades : any[]=[];
propiedades.push(props);
propiedades.push(props);
Obsjetc.entries.FOrEac(propiedades,(key, value ) => {
       key[value].isMostrarBtn = false;
})







*/
