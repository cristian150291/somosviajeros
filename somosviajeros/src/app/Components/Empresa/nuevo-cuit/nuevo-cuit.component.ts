import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevaEmpresaModel } from '../../../Core/Models/Empresa/nueva-empresa.model';
import { ValidacionesServices } from '../../../Core/Services/validaciones.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';
import { Router } from '@angular/router';
import { NuevaEmpresaService } from '../../../Core/Services/Empresa/nuevaempresa.service';

// Este se importa para captar parametros por las rutas
import { ActivatedRoute } from '@angular/router';
import { errorService } from '../../../Core/Services/Error/error.service';


@Component({
  selector: 'app-nuevo-cuit',
  templateUrl: './nuevo-cuit.component.html',
  styleUrls: ['./nuevo-cuit.component.sass'],
  providers : [ ValidacionesServices, NuevaEmpresaService ]
})
export class NuevoCuitComponent implements OnInit {

  public empresa: string;
  public nuevaempresaModel: NuevaEmpresaModel;
  public sUser: UserStorage;
  public storage: StorageService;
  public title: string;
  public errorServ: errorService;
  public update: string;


  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult: any;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private validar: ValidacionesServices,
    private navegacion: Router,
    private modalService: NgbModal,
    private _nuevaempresa : NuevaEmpresaService
  ) {

    this.empresa = this.activateRoute.snapshot.params.empresa;
    this.nuevaempresaModel = new NuevaEmpresaModel('', this.empresa);
    this.update = this.activateRoute.snapshot.params.update;
    this.sUser = new UserStorage( '', '', '', '', '', '', '', '', '',false);
    this.storage = new StorageService();
  }

  ngOnInit(): void {
    if (this.update == 'update'){
      this.sUser.setSession(this.storage.getCurrentSession());
      this.nuevaempresaModel.cuit = this.sUser.getEmpresa().cuit;
    }
  }
  
  onSubmit(from: any){    
    
    this.btnSiguiente.nativeElement.disabled = true;
    let algo = true;
    //if (this.validar.validarCuit(this.nuevaempresaModel.cuit)){
    if(algo){
      // GUARDO DAROS Y PASAMOS A CARGAR NUEVA SUCURSAL.
      this.storage.setDataAny(this.nuevaempresaModel,'empresaAux');      
      this.navegacion.navigate(['/home-empresa/puntotrabajo1']);

    }else{
      this.errorServ = new errorService();
      this.msgError = this.errorServ.meesageError('CUITERROR');

      this.modalAlert = this.modalService.open(this.refAlert);
      this.modalAlert.result.then((e: any) => {

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

			from.reset();
    }

    this.btnSiguiente.nativeElement.disabled = false;

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {      
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {      
      return 'by clicking on a backdrop';
    } else {      
      return `with: ${reason}`;
    }
  }

  // CIERRE DE MODAL
  closeAlert() { this.modalAlert.close(); }

  /** CARGA DE NUEVA EMPRESA EN MODO DE EDICION
   * @Observations Nueva empresa en modo de edicion, este metodo solo se ejecuta si estamos editando empresa,
   * ya que si es la primera vez que se carga se deberia continuar con el alta de sucursal y en esta caso ya estaria
   * cargada, a lo que debemos redirigir al usuario al dashboard nuevamente.
   * @param form referencia del formulario, contenedor de la data.
   */
  nuevaEmpresa(form){

    this.btnSiguiente.nativeElement.disabled = true;
    
    //if (this.validar.validarCuit(this.nuevaempresaModel.cuit)){
      let algo = true;
    if(algo){
      
      this._nuevaempresa.setNombreEmpresa(this.nuevaempresaModel,'emp').subscribe(
        response => {
          this.btnSiguiente.nativeElement.disabled = false;
          if(response.error == ''){
            this.storage = new StorageService();
            this.sUser.setSession(this.storage.getCurrentSession());
            this.sUser.setToken(response.token);   
            this.sUser.setEmpresa(this.nuevaempresaModel);
            this.storage.setCurrentSession(this.sUser);

            this.navegacion.navigate(['/home-empresa/dashboard/entrantes']);            
          }else {

            this.storage = new StorageService();
            this.sUser.setSession(this.storage.getCurrentSession());
            this.sUser.setToken(response.token);
            this.storage.setCurrentSession(this.sUser);
            
            this.msgError = response.error;
            this.modalAlert = this.modalService.open(this.refAlert);
            this.modalAlert.result.then((e) => {
            // DIALOGO CERRADO
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });   
          }
        },
        error => {
          this.btnSiguiente.nativeElement.disabled = false;
          console.log("Error server, Method : nuevaEmpresa() lin 104, edit empresa.", error);
        }
      );      

    }else{
      
      this.btnSiguiente.nativeElement.disabled = false;

      this.errorServ = new errorService();
      this.msgError = this.errorServ.meesageErrorLang('CUITERROR',this.sUser.getID());

      this.modalAlert = this.modalService.open(this.refAlert);
      this.modalAlert.result.then((e) => {
      // DIALOGO CERRADO
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });      
    }
    
  }

}
