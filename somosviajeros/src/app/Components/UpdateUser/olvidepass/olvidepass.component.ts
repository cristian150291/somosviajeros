import { Component, OnInit, Input , ViewChild, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUserModel } from '../../../Core/Models/nuevouser.model';
import { Router } from '@angular/router';
import { NuevoUserService } from '../../../Core/Services/nuevo-usuario.service';
import { ValidacionesServices } from '../../../Core/Services/validaciones.service';
import { ActivatedRoute } from '@angular/router';
import { errorService } from '../../../Core/Services/Error/error.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';

@Component({
  selector: 'app-olvidepass',
  templateUrl: './olvidepass.component.html',
  styleUrls: ['./olvidepass.component.sass'],
    providers : [ NuevoUserService, ValidacionesServices ]
})
export class OlvidepassComponent implements OnInit {

  public nuevoModel: NuevoUserModel;
  private emp = '' ;
  private errorService: errorService;
  private storage: StorageService;
  private sUser: UserStorage;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
      private navegacion: Router,
      private _nuevocodigoservice: NuevoUserService,
      private valido: ValidacionesServices,
      private activateRouter: ActivatedRoute,
      private modalService: NgbModal
  ) {
    this.nuevoModel = new NuevoUserModel('');
    this.emp = this.activateRouter.snapshot.params.emp;
  }

  ngOnInit(): void {

  }

  /**CAPTURA DATO Y SIGUE A CODIGO
   */
  onSubmit(nuevoForm){

    // DISABLED BUTTON
    this.btnSiguiente.nativeElement.disabled = true; 

    if (this.valido.validarMail(this.nuevoModel)){

      this._nuevocodigoservice.getOlvEmail(this.nuevoModel, 'usr').subscribe(
          response => {
            
            if (response.error == ''){
              
              this.errorService = new errorService();
              this.storage = new StorageService();              
              this.sUser = new UserStorage('','','','','','','','','',false);
              this.sUser.setSession(this.storage.getCurrentSession());
              this.msgError = this.errorService.meesageErrorLang('MSGSPAM',this.sUser.getID());

              // MODAL
              this.modalAlert = this.modalService.open(this.refAlert);
              this.modalAlert.result.then((e) => {
              // DIALOGO CERRADO
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });

              if (this.emp != ''){
                this.navegacion.navigate(['/updateuser/enviocodigo/' + this.nuevoModel.email + '/emp']);
              }else{
                this.navegacion.navigate(['/updateuser/enviocodigo/' + this.nuevoModel.email]);
              }              

            }else{
              
              // OBTENEMOS MENSAGE DE ERROR DE LA API.
              this.msgError = response.error;

              this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
              this.modalAlert.result.then((e) => {
              // DIALOGO CERRADO
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });              
            }

            this.btnSiguiente.nativeElement.disabled = false;

          },
          error => {
            this.btnSiguiente.nativeElement.disabled = false;
            this.errorService = new errorService();
            this.msgError = this.errorService.meesageError('SVERROR');

            this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
            this.modalAlert.result.then((e) => {
            // DIALOGO CERRADO
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });                        
          }
      );
    }else{

      this.btnSiguiente.nativeElement.disabled = false;
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
