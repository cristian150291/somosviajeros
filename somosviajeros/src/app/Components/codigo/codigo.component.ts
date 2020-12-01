import { Component, OnInit, Input , ViewChild, TemplateRef  } from '@angular/core';
import { CodigoModel } from '../../Core/Models/codigo.model';
import { CodigoService } from '../../Core/Services/codigo.service';
import { StorageService } from '../../Core/Services/storage.service';
import { Route, Router } from '@angular/router';
import { UserStorage } from '../../Core/Models/storage.model';
// Este se importa para captar parametros por las rutas
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.sass'],
  providers: [ CodigoService ]
})
export class CodigoComponent implements OnInit {

  public codigoModel: CodigoModel;
  public sUser: UserStorage;
  private storage: StorageService;
  private email: string;
  private codigo: string;
  private newEmp: string;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;
  @ViewChild('btnSiguiente') btnSiguiente;

  constructor(
    private _codigoService: CodigoService,
    private navegacion : Router,
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal
  ) {

        // INICIALIZO MODEL LOGIN
        this.codigoModel = new CodigoModel('');
        this.codigo = ' ';
   }


  ngOnInit(): void {
    this.email = this.rutaActiva.snapshot.params.email;
    this.newEmp = this.rutaActiva.snapshot.params.id;
  }

  onSubmit (codigoForm) {

    // DISABLED BUTTON
    this.btnSiguiente.nativeElement.disabled = true;

    // OBTENGO EL CODIGO
    this.codigo = this.codigoModel.cod1;

    this.storage = new StorageService();
    this.sUser = new UserStorage ('', '', '', '', '', '', '', '', '', false);
    this.sUser.setSession(this.storage.getCurrentSession());

    // ARMO JSON A ENVIAR AL SERVER
    let send = {
      email:  this.email,
      codigo : this.codigo,
      idioma : this.sUser.getID() 
    };

    this._codigoService.verificarCodigo(send, 'usr').subscribe(
      response => {        
        send = null;        
        if (response.error == ''){
          // CARGO DATOS EN EL LOCAL STORAGE
          this.storage = new StorageService();
          this.sUser = new UserStorage ('', '', '', '', '', '', '', '', '', false);
          this.sUser.setSession(this.storage.getCurrentSession());
          this.sUser.setToken(response.token);
          this.storage.setCurrentSession(this.sUser);
          codigoForm.reset();

          if (this.newEmp == 'emp'){
            this.navegacion.navigate(['/datosusuario' + '/' + this.newEmp]);
          }else{
            this.navegacion.navigate(['/datosusuario']);
          }
        }else {
          // GUARDAMOS MENSAGE DE ERROR.
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
        // GUARDAMOS MENSAGE DE ERROR.
        this.msgError = error;
        this.modalAlert = this.modalService.open(this.refAlert);  
        this.modalAlert.result.then((e) => {
        // DIALOGO CERRADO
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.btnSiguiente.nativeElement.disabled = false;
        console.log("Error DB eror : codigo.component : ",error);
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
