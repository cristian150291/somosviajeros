import { Component, Output, EventEmitter  } from '@angular/core';
import { LoginModel } from '../../Core/Models/login.model';
import { LoginService } from '../../Core/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public login: LoginModel;

  @Output() onSubmitLocal = new EventEmitter<LoginModel>();
  @Output() onSubmitSocial = new EventEmitter<string>();
  @Output() newUser = new EventEmitter();
  @Output() forgetUser = new EventEmitter();

  constructor(
  ) {
    this.login = new LoginModel('','');
  }

  /** ON SUBMIT INICIO SESION LOCAL */
  onSubmit(loginForm: any){
    this.onSubmitLocal.emit(this.login);
    loginForm.reset();
  }

  /** OLCIDE CONTRASEÑA **/
  olvPass(){
    this.forgetUser.emit();
  }

  /** RESGISTRARSE  **/
  onRegister(){
    this.newUser.emit();
  }

  /** REGISTRO CON REDES SOCIALES, METODOS **/
  signInWithGoogle(): void {    
    this.onSubmitSocial.emit('google');
  }

  signInWithFB(): void {
    this.onSubmitSocial.emit('facebook');
  }

}
