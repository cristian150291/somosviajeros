import { Injectable } from '@angular/core';
import { PasswordModel } from '../../Core/Models/password.model';


/** VALIDACIONES APP
 * @Observation : Esta objeto injectable se utiliza para desarrollar
 * las validaciones necesarias para trabajar con la app.
 * Agregar los metodos necesarios para luego ser llamado por el modulo 
 * que lo requiera. 
 * Por favor comentar cada metodo que recibe, que hace y que devuelve.
 * 
 * Saludos con mucho cariño y amor al desarrollo de software 
 * Cristian Vargas.
 * 
 * PD : Cherencio debe estar orgulloso de mi.,
 */
@Injectable()
export class ValidacionesServices {

  constructor (){

  }

  //INSERT YOU CODE METHOD

  /** VALIDAR PASSWORD
   * @Observations : Metodo que valida las contraseñas digitadas por el usuario
   * para registrarse.
   * 
   * @param pass Modelo de password
   */
  validatePass(pass:PasswordModel){
      if(pass.pass == pass.passConfirm){            
        return true;
      }
      return false;
  }

  validarMail(mail:any){
    let myemail = mail.email;
    
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (myemail.match(EMAIL_REGEX)) return true;

  return false;
  }

  /** VALIDACION DE CUIT 
   * @Observartions : Metodo para validacion de cuit para la argentina
   * 
   * @Param cuit tipo de dato string para validar formato
   */
  validarCuit (cuit:string){
      let cuitval = cuit.substring(0,2) + cuit.substring(3,11) + cuit.substring(12);      
      return this.cuilValidator(cuitval);
  }
  cuilValidator(cuit: string): boolean {
    if (cuit.length !== 11) {
      return false;
    }
  
    const [checkDigit, ...rest] = cuit
      .split('')
      .map(Number)
      .reverse();
  
    const total = rest.reduce(
      (acc, cur, index) => acc + cur * (2 + (index % 6)),
      0,
    );
  
    const mod11 = 11 - (total % 11);
  
    if (mod11 === 11) {
      return checkDigit === 0;
    }
  
    if (mod11 === 10) {
      return false;
    }
  
    return checkDigit === mod11;
  }

}