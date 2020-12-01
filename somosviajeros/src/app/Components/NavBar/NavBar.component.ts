import { Component, OnInit, TemplateRef, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../Core/Services/login.service';
import { LoginModel } from '../../Core/Models/login.model';
import { navbar } from '../../Animations/animations';
//IMPORT PARA IDIOMA
import { TranslateService} from '@ngx-translate/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider , FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { DatosEmpresaService } from '../../Core/Services/datosempresa.service';


@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.css'],
  animations: [ navbar ],
  providers: [ LoginService, DatosEmpresaService ]
})
export class NavBarComponent implements OnInit, OnChanges {

  public modalLogin: NgbModalRef;
  public msgError: string;
  public closeResult: string;
  public datoLogin: boolean;
  private user : SocialUser;
  public sUser: UserStorage;
  private storage: StorageService;
  public nameUser: String = '';
  public session: boolean = false;
  public isOpen = false;
  public imgUser = '';

  toggle(): void {
        this.isOpen = !this.isOpen;
  }

  /** REFERENCIA MODAL PARA INICIO SESION **/
  @ViewChild('login') refLoginModel: TemplateRef<any>;
  /** HOME NOTIFICA QUE ES UN CIERRE DE SESION **/
  @Input('notifyLogin') notifyLogin: string;
  @Output() empresa = new EventEmitter<boolean>();
  @Output() loginSuccess = new EventEmitter<boolean>();
	@Input('isEmp') isaEmpresa : boolean = false;

  constructor(
    public translate:TranslateService,
    private modalService: NgbModal,
    private _loginService: LoginService,
    private navegacion: Router,
    private authService: SocialAuthService,
		private _datosEmp: DatosEmpresaService
  ) { 
  }

  ngOnInit() {

    this.storage = new StorageService();
    if(this.storage.getCurrentSession() != null){
      this.sUser = new UserStorage('es', '', '', '', '', '', '', '', '',false);
      this.sUser.setSession(this.storage.getCurrentSession());
      this.nameUser = this.sUser.getName();
      if(this.sUser.getImg() != ''){
        this.imgUser = this.sUser.getImg();
      }
      this.session = true;
    }
  }

  ngOnChanges(changes: any ) {
		if ( changes ){ // hay cambio de data, posible swicht 
		}
    if ( this.notifyLogin == 'logout' && this.notifyLogin != undefined ){
      this.signOut();
    }
  }

  onSubmit(login: LoginModel){
    this._loginService.setLogin(login, 'usr').subscribe(

      response => {
        if(response.error == ''){

          this.storage = new StorageService();
          this.sUser = new UserStorage ('es','','','','','','','','',false);
          this.sUser.setSession(this.storage.getCurrentSession());
          this.sUser.setApellido( response.datos[0].apellido );
          this.sUser.setNombre( response.datos[0].nombre );
          this.sUser.setMail( response.datos[0].email );
          this.sUser.setToken(response.token);
          this.sUser.setEmpresa(response.empresa);
          this.sUser.setTipo('normal');
          this.storage.setCurrentSession(this.sUser);

					this.nameUser = this.sUser.getName();
					this.session = true;
					this.imgUser = this.sUser.getImg();

					if(this.sUser.getEmpresa() != ''){
						this.empresa.emit(true);
					}else{
						this.empresa.emit(false);
					}

					this.getDatosEmpresa().then( ( data: boolean ) =>{

							if ( data ) { //isEmpresa
							}

							//Emito login success a padre
							this.loginSuccess.emit(true);
						
					}).catch( (error)=>{
							if(error == false) console.log('error al intentar conectar con la api');
							this.loginSuccess.emit(false);
					});


					this.closeModalLogin();

        }else{

          this.loginSuccess.emit(false);
          this.msgError = response.error;
        }
      },

      error => {
        console.log(error);
      }

    );

  }


  onSubmitLoginSocial(tipo: string){
    this.socialSignIn(tipo);
  }


  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider: any;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
        
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {        
        this.user = userData;
        if(this.user != null){
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

            return ;
          }

          // CARGO LOS DATOS EN NUESTRO SERVER
          this._loginService.setLoginExterno(this.sUser.token,this.user.provider.toLowerCase()).subscribe(
            response => {              
              if (response.error == ''){
                
                if(this.storage.getCurrentSession()!= null) this.sUser.setSession(this.storage.getCurrentSession());

                //this.sUser = this.storage.getCurrentSession();
                this.sUser.setToken( response.token );
                this.sUser.setEmpresa( response.empresa );
                this.nameUser = this.sUser.getName();
                this.session = true;
                this.imgUser = this.sUser.getImg();
                this.storage.setCurrentSession(this.sUser);

								if(this.sUser.getEmpresa() != ''){
									this.empresa.emit(true);
								}else{
									this.empresa.emit(false);
								}

                this.closeModalLogin();

								this.getDatosEmpresa().then( ( data: boolean ) =>{

										if( data ){ //isEmpresa										
										}
										//Emito login success a padre, por el momento solo esta subcripto confirmar viaje
										this.loginSuccess.emit(true);
									
								}).catch( (error)=>{
										if(error == false) console.log('error al intentar conectar con la api');
										this.loginSuccess.emit(false);
								});


              }else{
                this.storage.removeCurrentSession();
                this.msgError = response.error;

                this.loginSuccess.emit(false);
              }
            },
            error => {
              console.log("Error login social user line  149 : ", error);
            }
          );
        }else  {
          console.log('Error retorno peticion de login social, linea 161 : NavBarComponent');
        }
     });
  }

 /**  CIERRE DE SESION DE USUARIO   **/
  signOut(): void {
    this.storage = new StorageService();
    this.sUser = new UserStorage('','','','','','','','','',false);
    this.sUser.setSession(this.storage.getCurrentSession());
    if(this.sUser.getTipo()!=='normal'){
      this.authService.signOut();
    }    
    // ELIMINAR SOLICITUD
    if(this.storage.existData('solicitud')){
      this.storage.removeData('solicitud');
    }
    // ELIMINO EL LOCAL STORAGE CON LOS DATOS DEL MISMO.
    this.storage.removeCurrentSession();
    // RECONSTRUYO DATOS ESTANDAR DE LA PAGE,
    this.sUser = new UserStorage('es','','','','','','','','',false);
    this.storage.setCurrentSession(this.sUser);
    this.session = false;
    this.navegacion.navigate(['/home']);
  }


 /* REGISTRAR NUEVO USUARIO */
 onRegister(){
    this.navegacion.navigate(['/nuevouser']);
    this.closeModalLogin();
 }

  /** OLVIDE MI CONTRASEÑA */
  olvPass(){
    this.navegacion.navigate(['/updateuser/enviomail']);
    this.closeModalLogin();
  }

  LangEs(){
    this.translate.use('es');
  }
  LangPt(){
    this.translate.use('pt');
  }
  LangEn(){
    this.translate.use('en');
  }

  
  /** CLICK INICIO DE SESION */
  showModalLogin () {
    this.modalLogin = this.modalService.open(this.refLoginModel);
    this.modalLogin.result.then(()=>{
      
    }, (reason)=> {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModalLogin(){ this.modalLogin.close(); }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {      
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {      
      return 'by clicking on a backdrop';
    } else {      
      return `with: ${reason}`;
    }
  }


	/** OBTENER DATOS DE SUCURSAL SI TINE EMPRESA
	 * @Observations : realizamos peticion para obtener
	 * datos de sucursal.
	 */ 
	getDatosEmpresa ():Promise<boolean>{
		this.storage = new StorageService();
    this.sUser = new UserStorage ('es','','','','','','','','',false);
		if (this.storage.getCurrentSession() != null) this.sUser.setSession(this.storage.getCurrentSession());

		return new Promise((resolve, reject) => {
			this._datosEmp.getDatosEmp().subscribe(
				response => {
					if(response.error == ''){
					    this.sUser.setToken(response.token);
					    this.sUser.setPreposicion(response.datossuc);
					    this.storage.setCurrentSession(this.sUser);
							resolve(true);
					}else{
							this.sUser.setToken(response.token);
							this.storage.setCurrentSession(this.sUser);
							resolve(false);						
					}
				},
				error => {
					console.log('Error DB (getDatosEmpresa()) : ',error);
					reject(false);
				}
			);
		});

	}



}
