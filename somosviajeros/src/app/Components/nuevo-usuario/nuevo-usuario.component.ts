import { Component, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { NuevoUserModel } from '../../Core/Models/nuevouser.model';
import { NuevoUserService } from '../../Core/Services/nuevo-usuario.service';
import { Route, Router } from '@angular/router';
import { ValidacionesServices } from '../../Core/Services/validaciones.service';
// Este se importa para captar parametros por las rutas
import { ActivatedRoute, Params } from '@angular/router';
import { UserStorage } from '../../Core/Models/storage.model';
import { StorageService } from '../../Core/Services/storage.service';
import { errorService } from '../../Core/Services/Error/error.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.sass'],
  providers: [ NuevoUserService,ValidacionesServices]
})
export class NuevoUsuarioComponent implements OnInit {

  public nuevousermodel: NuevoUserModel;
  private newEmp: string;
  private storage: StorageService;
  private sUser: UserStorage;
  private errorService: errorService;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;
  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
    private _nuevoUserService: NuevoUserService, // cargamos servicio login para formulario
    private navegacion : Router,
    private validar: ValidacionesServices,
    private activatRutes: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.nuevousermodel = new NuevoUserModel('');
    this.newEmp = this.activatRutes.snapshot.params.id;
  }


  ngOnInit(): void {

  }

 /**ON SUBMIT
 * @Observations : Metoodo on submit es un evento click del formulario nuevo user form
 * @param nuevouserForm referencia al objeto form de nuevo usuario
 */ 
  onSubmit (nuevouserForm){

    this.btnSiguiente.nativeElement.disabled = true;

    // Comprobación de tipo de mail valido
    if(this.validar.validarMail(this.nuevousermodel)){
      // PETICION
      this._nuevoUserService.getNuevoUser(this.nuevousermodel, 'usr').subscribe(
        // RESPUESTA SEUCCES DEL SERVER
        response => {
          this.btnSiguiente.nativeElement.disabled = false;
          
          if (response.error == ''){
          
            if(this.newEmp == 'emp'){
              this.navegacion.navigate(['/codigo/' + this.nuevousermodel.email + '/' + this.newEmp]);
            }else{
              this.navegacion.navigate(['/codigo/' + this.nuevousermodel.email]);
            }
            (async () => {
              await this.delay(1000);

              this.storage = new StorageService();
              this.errorService = new errorService();
              this.sUser = new UserStorage('','','','','','','','','',false);
              this.sUser.setSession(this.storage.getCurrentSession());
              this.msgError = this.errorService.meesageErrorLang('MSGSPAM',this.sUser.getID());

              this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
              this.modalAlert.result.then((e) => {
              // DIALOGO CERRADO
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });
              
            })();
          }else {
            nuevouserForm.reset();
            // OBTENEMOS MENSAGE DE ERROR DE LA API.
            this.msgError = response.error;

            this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
            this.modalAlert.result.then((e) => {
            // DIALOGO CERRADO
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            
          }
        },
        // RESPUESTA ERROR DEL SERVER
        error => {
          this.btnSiguiente.nativeElement.disabled = false;
          console.log("Error Server nuevo-usuario.component line 104 : ",error);
        }

      );
    }else{
      this.btnSiguiente.nativeElement.disabled = false;
      nuevouserForm.reset();
      this.errorService = new errorService();
      this.msgError = this.errorService.meesageError('INVMAIL');

      this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
      this.modalAlert.result.then((e) => {
      // DIALOGO CERRADO
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });      
    }
  }

  // tslint:disable-next-line:typedef
  delay (ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
