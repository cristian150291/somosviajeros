import { Component, OnInit,  ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { LoginModel } from '../../Core/Models/login.model';
import { LoginService } from '../../Core/Services/login.service';
import { Route, Router } from '@angular/router';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatosEmpresaService } from '../../Core/Services/datosempresa.service';
//Modulo y servicio para logueo con redes SOCIALES
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider , FacebookLoginProvider } from "angularx-social-login";  //FacebookLoginProvider,
//MODEL DE DATOS ENVIADOS AL INICIO DE SESION CON REDES SOCIALES
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-loginempresa',
  templateUrl: './loginempresa.component.html',
  styleUrls: ['./loginempresa.component.sass'],
  providers: [ LoginService, DatosEmpresaService ]
})
export class LoginempresaComponent implements OnInit {

  // MENSAJE HIJO LOGINSOCIAL
  public msgSocial = false;
  public tipoLogin = 'emp';

  //MODEL LOGIN SOCIAL
  private user : SocialUser;

  public login: LoginModel;
  public sUser: UserStorage;
  private storage: StorageService;

  // MODAL REF DE NG MODAL
  public modalAlert : NgbModalRef;
  private closeResult;
  public msgError: string;
  
  public loggedIn = true;
	public IamEmpresa : boolean = true;

  //OBTENGO REFERENCIA DE NG-TEMPLATE ALERT, PARA PODER LEVANTAR EL MODAL CUNADO SEA NECESARIO.
  @ViewChild('alerMarker') refAlert : TemplateRef<any>;

  constructor(
    private _loginService: LoginService, // cargamos servicio login para formulario
    private navegacion : Router,
    private modalService: NgbModal,
    private _dataEmp: DatosEmpresaService,
    private authService: SocialAuthService  // Servicio para peticiones redes sociales
  ) {
    // INICIALIZO MODEL LOGIN
    this.login = new LoginModel('', '');
  }

  ngOnInit(): void {

  }


   /**ON SUBMIT
   * @Observations : Metoodo on submit es un evento click del formulario login form,
   * este evento realiza la peticion al servicio para logear al usuario.
   * si este es satisfactorio, osea que json.error  = "" este debe ser redireccinado
   * a la pagina principalm dependiendo si es empresa o usuario , como deberia confimar la misma
   * respues del server.
   * @param loginForm referencia al objeto form de login form
   */

  onSubmit(loginForm){

    this._loginService.setLogin(this.login, 'usr').subscribe(
      // RESPUESTA SUCCESs DEL SERVER
      response => {
        // tslint:disable-next-line:triple-equals
        if(response.error == ''){
          // CARGO DATOS EN EL LOCAL STORAGE
          this.storage = new StorageService();
          this.sUser = new UserStorage ('', '', '', '', '',  '','', '', '', false);
          this.sUser.setSession(this.storage.getCurrentSession());
          this.sUser.setApellido(response.datos[0].apellido);
          this.sUser.setNombre(response.datos[0].nombre);
          this.sUser.setMail(response.datos[0].email);
          this.sUser.setToken(response.token);
          this.sUser.setEmpresa(response.empresa);
          this.sUser.setTipo('normal');
          this.storage.setCurrentSession(this.sUser);

          // tslint:disable-next-line:triple-equals
          if (response.empresa == ''){
            // NUEVA EMPRESA
            this.navegacion.navigate(['home-empresa/nuevaempresa']);
          }else{
            
            // SOLICITAMOS DATOS DE SUCURSALES
            this._dataEmp.getDatosEmp().subscribe(
              response => {
                if(response.error == ''){
                  //GUARDAMOS TOKEN DEVUELTO.                 
                  this.sUser.pReposicion = response.datossuc;
                }

                this.sUser.setToken(response.token);
                this.storage.setCurrentSession(this.sUser);
              },
              error => {
                // ERROR SOLO PARA DESARROLLADOR.
                console.log("getDatosEmpresa : ", error);
              }
            );
            
            // DASHBOARD DE EMPRESA
            this.navegacion.navigate(['home-empresa/dashboard']);
          }
          loginForm.reset();
        }else{
          // OBTENEMOS MENSAGE DE ERROR DE LA API
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
        console.log(error);
      }

    );

  }


  /** RESGISTRARSE
   * @Observations : Evento del boton registrarse, este mismo redirige a la opcion para registrarse
   * al sistema por primera vez.
  */  
  onRegister(){
    this.navegacion.navigate(['nuevouser/emp']);
  }

  /**  Redirige al Home de usuario */
  homeUser(){
    this.navegacion.navigate(['/home']);
  }

  signOut(): void {
    if (this.loggedIn ){
      this.storage = new StorageService();
      this.storage.removeCurrentSession();
    }
  }

  /**OLVIDE MI CONTRASEÑA EMPRESA
   * @Observations Metodo que redirige a solicitud de nuevo password para el user,
   * en esta caso para volver a empresa vamos a realizar como nuevo user donde le indico por parametro
   * que el registro nace desde empresa asi al finalisar retorna al login de la empresa.
   *
   */  
  OlvPassword(){
    this.navegacion.navigate(['/updateuser/enviomail/emp']);
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

   /** REGISTRO CON REDES SOCIALES, METODOS **/
   signInWithGoogle(): void {    
    this.socialSignIn("google");
  }

  signInWithFB(): void {
    this.socialSignIn("facebook");
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;            
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {        
        this.user = userData;
        this.loggedIn = (this.user != null);
        if(this.loggedIn){
          // CARGO DATOS EN EL LOCAL STORAGE
          this.storage = new StorageService();
          this.sUser = new UserStorage ('es','','','','','','','','',false);

          if(this.user.provider=="GOOGLE"){         
            if(this.storage.getCurrentSession()!= null) this.sUser.setSession(this.storage.getCurrentSession());
            this.sUser.apellido =this.user.lastName;
            this.sUser.nombre =this.user.firstName;
            this.sUser.email = this.user.email;
            this.sUser.token = this.user.idToken;
            this.sUser.img = this.user.photoUrl;            
            this.sUser.tipo = this.user.provider.toLowerCase();
            this.storage.setCurrentSession(this.sUser);
          }

          if(this.user.provider=="FACEBOOK"){
            if(this.storage.getCurrentSession()!= null) this.sUser.setSession(this.storage.getCurrentSession());
            this.sUser.apellido =this.user.lastName;
            this.sUser.nombre =this.user.firstName;
            this.sUser.email = this.user.email;
            this.sUser.token = this.user.authToken;
            this.sUser.img = this.user.photoUrl;            
            this.sUser.tipo = this.user.provider.toLowerCase();
            this.storage.setCurrentSession(this.sUser);

            console.log(this.user);
            this.navegacion.navigate(['home-empresa/dashboard']);
            return ;            
          }

          // CARGO LOS DATOS EN NUESTRO SERVER
          this._loginService.setLoginExterno(this.sUser.token,this.user.provider.toLowerCase()).subscribe(
            response => {              
              if (response.error == ''){                
                if(this.storage.getCurrentSession()!= null) this.sUser.setSession(this.storage.getCurrentSession());
                this.sUser = this.storage.getCurrentSession();
                this.sUser.token = response.token;
                this.sUser.empresa = response.empresa;
                this.storage.setCurrentSession(this.sUser);
                                                
                if (response.empresa == ''){
                  // NUEVA EMPRESA
                  this.navegacion.navigate(['home-empresa/nuevaempresa']);
                }else{
                  
                  // SOLICITAMOS DATOS DE SUCURSALES
                  this._dataEmp.getDatosEmp().subscribe(
                    response => {
                      if(response.error == ''){
                        //GUARDAMOS TOKEN DEVUELTO.
                        this.sUser.token = response.token;
                        this.sUser.pReposicion = response.datossuc;
                        this.storage.setCurrentSession(this.sUser);
                      }
                    },
                    error => {
                      // ERROR SOLO PARA DESARROLLADOR.
                      console.log("getDatosEmpresa loginsocial : ", error);
                    }
                  );
                  
                  // DASHBOARD DE EMPRESA
                  this.navegacion.navigate(['home-empresa/dashboard']);
                }                  
                
                
              }else{

                // OBTENEMOS MENSAJE DE ERROR.
                this.msgError = response.error;

                this.modalAlert = this.modalService.open(this.refAlert);   // ABRO MODAL PARA VALIDAR LA CORRECTA ACCION DEL USUARIO
                this.modalAlert.result.then((e) => {
                // DIALOGO CERRADO
                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });  
                
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }
}
