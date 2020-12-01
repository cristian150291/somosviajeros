import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmardatosComponent } from './confirmardatos/confirmardatos.component';
import { DatosextraComponent } from './datosextra/datosextra.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../../../assets/i18n/','.json');
}



//AGM ANGULAR GOOGLE MAPS
// import { AgmCoreModule } from '@agm/core';            // @agm/core
// import { AgmDirectionModule } from 'agm-direction';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   // agm-direction
 
@NgModule({
  declarations: [
    ConfirmardatosComponent,
    DatosextraComponent
  ],
  entryComponents: [
    
  ],
  exports : [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

    // AgmCoreModule.forRoot({ // @agm/core
    //   apiKey: 'AIzaSyAqt4iOo-B_D92aMHU09x78PZ4k_4FTHTY',
    // }),
    // AgmDirectionModule,
    // BrowserAnimationsModule   // agm-direction   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ViajesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ViajesModule      
    }
  }
 }
