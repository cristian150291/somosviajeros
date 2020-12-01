import { Component, OnInit, Input , ViewChild, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Route, Router } from '@angular/router';
import { CodigoModel } from '../../../Core/Models/codigo.model';
import { CodigoService } from '../../../Core/Services/codigo.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';
import { errorService } from '../../../Core/Services/Error/error.service';


@Component({
  selector: 'app-olvidepasscodigo',
  templateUrl: './olvidepasscodigo.component.html',
  styleUrls: ['./olvidepasscodigo.component.sass'],
  providers : [ CodigoService ]
})
export class OlvidepasscodigoComponent implements OnInit {

  public email = '';
  public emp = '';
  public codigoModel: CodigoModel;
  public vUser: UserStorage;
  public storage: StorageService;
  private errorService: errorService;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
      private rutaActiva: ActivatedRoute,
      private navegacion: Router,
      private _codigoService: CodigoService,
      private modalService: NgbModal
  ) {

    this.email = rutaActiva.snapshot.params.email;
    this.emp = rutaActiva.snapshot.params.emp;
    this.codigoModel = new CodigoModel('');
    this.vUser = new UserStorage('', '', '', '', '', '', '', '', '', false);
    this.storage = new StorageService();
  }

  ngOnInit(): void{
    
  }

  onSubmit (codigoForm){

    // DISABLED BUTTON
    this.btnSiguiente.nativeElement.disabled = true;

    this.vUser.setSession(this.storage.getCurrentSession());
    const send = {
      email  : this.email,
      codigo : this.codigoModel.cod1,
      idioma : this.vUser.getID()  
    };

    this._codigoService.verificarCodigooLV(send, 'usr').subscribe(
        response => {
          
          if (response.error == ''){
            this.vUser.token = response.token;
            this.storage.setCurrentSession(this.vUser);
            
            if (this.emp != ''){
              this.navegacion.navigate(['/updateuser/envionewpass/emp']);
            }else{
              this.navegacion.navigate(['/updateuser/envionewpass']);
            }
          }else{
            // OBTENEMOS EL MENSAGE DE ERROR
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
          // ERROR DEL SERVER.
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
