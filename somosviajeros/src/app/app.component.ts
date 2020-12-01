import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './Core/Services/storage.service';
import { UserStorage } from './Core/Models/storage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'somosviajeros';
  private storage: StorageService;
  private vUser: UserStorage;

  constructor (
    public translate:TranslateService   //IMPORTAMOS TRANSLATE SERVICE PARA MANEJO DE IDIOMA
  ) {
    this.storage = new StorageService();
    this.vUser = new UserStorage('','','','','','','','','',false);

    if(this.storage.getCurrentSession() != null) {
      this.vUser.setSession(this.storage.getCurrentSession());
    }

    this.storage.setCurrentSession(this.vUser);
    this.translate.addLangs(['es','en','pt']);

    if(this.vUser.getID()==''){
      this.vUser.setId('es');
      this.translate.setDefaultLang('es');
    }else{
      this.translate.setDefaultLang(this.vUser.getID());     
      this.translate.use(this.vUser.getID());
    }
    
    
    
  }
}
