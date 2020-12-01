import { Component, OnInit } from '@angular/core';
//IMPORT PARA IDIOMA
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { StorageService } from '../../Core/Services/storage.service';
import { UserStorage } from '../../Core/Models/storage.model';


@Component({
  selector: 'app-banderas',
  templateUrl: './banderas.component.html',
  styleUrls: ['./banderas.component.sass']
})
export class BanderasComponent implements OnInit {
  
  public selectedAccount:any;  
  public vUser: UserStorage;
  public storage: StorageService;

  // ARRAY CON LOS IDIOMAS SETEADOS POR EL MOMENTO.
  idiomas = [
    {id: '1', name: 'español' ,  url:'https://dev.roddapp.com/web/somosviajeros/assets/img/banderas/argentina.svg'},
    {id: '2', name: 'portugues', url:'https://dev.roddapp.com/web/somosviajeros/assets/img/banderas/brazil.svg'},
    {id: '3', name: 'ingles',    url:'https://dev.roddapp.com/web/somosviajeros/assets/img/banderas/united-states-of-america.svg'}
  ];


selectedCity: any;

  constructor(
    private translate:TranslateService
   ) {
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);
    this.vUser.setSession(this.storage.getCurrentSession());
    this.translate.addLangs(['es','en','pt']);
    this.translate.setDefaultLang('es');
    switch(this.vUser.getID()) { 
      case 'es': { // ESPAÑOL
        this.LangEs();          
        break; 
      } 
      case 'pt': { // PORTUGUEZ
        this.LangPt();
        break; 
      } 
      case 'en': { // INGLES
        this.LangEn();
        break; 
      }          // DEFAOULT
      default: { 
        this.LangEs();
        break; 
      } 
    }    
  }

  ngOnInit() {
    // SETEO POR DEFAULT AL ESPAÑOL AL INICIAR EL SISTEMA.

    if(this.storage.getCurrentSession()!= null){
      this.vUser.setSession(this.storage.getCurrentSession());
      if(this.vUser.getID() == ''){
        this.selectedAccount = '1';
      }else{
        switch(this.vUser.getID()) { 
          case 'es': { // ESPAÑOL
            this.selectedAccount = '1';            
            break; 
          } 
          case 'pt': { // PORTUGUEZ
            this.selectedAccount = '2';            
            break; 
          } 
          case 'en': { // INGLES
            this.selectedAccount = '3';            
            break; 
          }          // DEFAOULT
          default: { 
            this.selectedAccount = '1';
            break; 
          } 
        }        
      }      
    }else{
      this.selectedAccount = '1';
    }    
  }

  /** EVENTO CHANGES
   * @Observations Obntenemos evento de cambio del select que contiene las 
   * banderas de idioma, al cambiar captura el evento y seteo el idioma 
   * que haya seleccionado.
   * 
   * @param event contenido options del select cliqueado.
   */
  onChangeSelect(event){    
    let valor:number = event.id;
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);
    if(this.storage.getCurrentSession() != null ){
      this.vUser.setSession(this.storage.getCurrentSession());
    }

    switch(event.id) { 
      case '1': { // ESPAÑOL
        this.vUser.setId('es');
        this.storage.setCurrentSession(this.vUser);        
        this.LangEs();
        break; 
      } 
      case '2': { // PORTUGUEZ
        this.vUser.setId('pt');
        this.storage.setCurrentSession(this.vUser);        
        this.LangPt();
        break; 
      } 
      case '3': { // INGLES
        this.vUser.setId('en');
        this.storage.setCurrentSession(this.vUser);        
        this.LangEn();
        break; 
      }          // DEFAOULT
      default: { 
        this.LangEs();
         break; 
      } 
   } 

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
}
