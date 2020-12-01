import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanderasComponent } from './banderas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
//IMPORT PARA LIBRERIAS DE TRASNLATE , MANEJO DE IDIOMAS
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../../../assets/i18n/','.json');
}

@NgModule({
  declarations: [
    BanderasComponent
  ],
  exports : [
    BanderasComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BanderasModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: BanderasModule      
    }
  }
 }
