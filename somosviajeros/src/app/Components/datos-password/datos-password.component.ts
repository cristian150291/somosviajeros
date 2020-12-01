import { Component, OnInit, Input , ViewChild, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// Este se importa para captar parametros por las rutas
import { ActivatedRoute, Params } from '@angular/router';
import { PasswordModel } from '../../Core/Models/password.model';
import { DatosUserModel } from '../../Core/Models/datosuser.model';
import { Route, Router } from '@angular/router';
import { DatosUserService } from '../../Core/Services/datosuser.service';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { ValidacionesServices } from '../../Core/Services/validaciones.service';
import { errorService } from '../../Core/Services/Error/error.service';


@Component({
  selector: 'app-datos-password',
  templateUrl: './datos-password.component.html',
  styleUrls: ['./datos-password.component.sass'],
  providers : [DatosUserService, ValidacionesServices]
})
export class DatosPasswordComponent implements OnInit {

  public passwordModel: PasswordModel;
  public datosuserModel: DatosUserModel;
  private newEmp: string;
  private storage: StorageService;
  private sUser: UserStorage;
  private errorService: errorService;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUANDO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
    private navegacion: Router,
    private rutaActiva: ActivatedRoute,
    private _datosuserservice: DatosUserService,
    private validar: ValidacionesServices,
    private modalService: NgbModal
  ) {

    this.passwordModel = new PasswordModel('', '');
    this.datosuserModel = new DatosUserModel('', '');

    this.datosuserModel.nombre = this.rutaActiva.snapshot.params.nombre;
    this.datosuserModel.apellido = this.rutaActiva.snapshot.params.apellido;
    this.newEmp = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  onSubmit(datosForm: any){

    this.btnSiguiente.nativeElement.disabled = true;

    if(this.validar.validatePass(this.passwordModel)){

      this._datosuserservice.setUser(this.datosuserModel, this.passwordModel, 'usr').subscribe(
        response => {
        
          if (response.error == ''){

            // MODAL DE BIENVENIDA PARA EL USUARIO.
            this.errorService = new errorService();
            this.msgError = this.errorService.meesageError('BNVIDA');

            this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
            this.modalAlert.result.then((e) => {
            // DIALOGO CERRADO
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            

             // CARGO DATOS EN EL LOCAL STORAGE
            this.storage = new StorageService();
            this.sUser = new UserStorage ('', '', '', '', '', '', '', '', '', false);
            this.sUser.setSession(this.storage.getCurrentSession());
            this.sUser.setToken(response.token);            
            this.storage.setCurrentSession(this.sUser);

            datosForm.reset();
            
            if(this.newEmp == 'emp'){
              this.navegacion.navigate(['/home-empresa']);
            }else{
              this.navegacion.navigate(['/home']);
            }
          }else{
            // OBTENEMOS RESPUESTA DE ERROR DE LA API.
            this.msgError = response.error;
            this.modalAlert = this.modalService.open(this.refAlert);
            this.modalAlert.result.then((e) => {
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            
          }

          this.btnSiguiente.nativeElement.disabled = false;

        },
        error => {
          // ERRORES VARIOS, INTERNET, PROBLEMAS CON EL SERVER
          this.btnSiguiente.nativeElement.disabled = false;
          console.log('datos-password.component.ts line 114 : ',error);
        }
      );
    }else{
      this.btnSiguiente.nativeElement.disabled = false;
      // OBTENEMOS MENSAGE DE ERROR PREDISEÑADOS POR POSIBLES ERRORES DEL SERVIDOR.
      this.errorService = new errorService();
      this.msgError = this.errorService.meesageError('ERRPWD');

      this.modalAlert = this.modalService.open(this.refAlert); 
      this.modalAlert.result.then((e) => {
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });      
    }
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
}
