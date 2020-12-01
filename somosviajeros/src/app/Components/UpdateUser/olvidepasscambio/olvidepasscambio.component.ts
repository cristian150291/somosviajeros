import { Component, OnInit, Input , ViewChild, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PasswordModel } from '../../../Core/Models/password.model';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';
import { Router } from '@angular/router';
import { NuevoUserService } from '../../../Core/Services/nuevo-usuario.service';
import { ActivatedRoute, Params } from '@angular/router';
import { errorService } from '../../../Core/Services/Error/error.service';

@Component({
  selector: 'app-olvidepasscambio',
  templateUrl: './olvidepasscambio.component.html',
  styleUrls: ['./olvidepasscambio.component.sass'],
  providers :  [ NuevoUserService ]
})
export class OlvidepasscambioComponent implements OnInit {

  public vUser: UserStorage;
  public storage: StorageService;
  public passModal: PasswordModel;
  public emp = '';
  private errorService: errorService;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
      private navegacion: Router,
      private _cambioPass: NuevoUserService,
      private activateRoute: ActivatedRoute,
      private modalService: NgbModal
  ) {
    this.vUser = new UserStorage('', '', '', '', '', '', '', '', '', false);
    this.storage = new StorageService();
    this.passModal = new PasswordModel('', '');
    this.emp = this.activateRoute.snapshot.params.emp;
  }

  ngOnInit(): void {
  }

  /**ENVIO NUEVA PASS
   * @Observatrions Envio las contraseñas nuevas para registrarlas
   * @param passModal
   */
  onSubmit(passForm){

    // DISABLED BUTTON
    this.btnSiguiente.nativeElement.disabled = true; 

    if (this.passModal.pass == this.passModal.passConfirm){

      let idioma;
      this.vUser.setSession(this.storage.getCurrentSession());
      if(this.vUser.getID() == ''){
        idioma = 'es';
      }else{
        idioma = this.vUser.getID();
      }

      const send = {
        'token'     : this.vUser.token,
        'pass'      : this.passModal.pass,
        'passnueva' : this.passModal.passConfirm,
        'idioma'    : idioma
      };

      this._cambioPass.verificoOlvPass(send, 'usr').subscribe(
          response => {              
              if (response.error == ''){
                 this.vUser.setToken(response.token);
                 this.storage.setCurrentSession(this.vUser);                  
                 if (this.emp != ''){
                  this.navegacion.navigate(['/home-empresa']);
                 }else{
                  this.navegacion.navigate(['/home']);
                 }
              }else {

                this.vUser.setToken(response.token);
                this.storage.setCurrentSession(this.vUser);                

                // OBTENEMOS MENSAGE DE ERROR DE LA API.
                this.msgError = response.error;
      
                this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
                this.modalAlert.result.then((e) => {                
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
      this.msgError = this.errorService.meesageError('ERRPWD');

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
