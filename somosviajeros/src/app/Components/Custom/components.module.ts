import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { PanelviajesComponent } from './panelviajes/panelviajes.component';
import { DynamicHostDirective } from './dynamicComponents/dynamic-host.directive';
import { PanelviajesitermedioComponent } from './panelviajesitermedio/panelviajesitermedio.component';
import { HeaderpanelviajesComponent } from './headerpanelviajes/headerpanelviajes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//IMPORTAMOS MODULO PARA MANEJO DE AUTOCOMPLETE DE GOOGLE
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    PanelviajesComponent,
    DynamicHostDirective,
    PanelviajesitermedioComponent,
    HeaderpanelviajesComponent
  ],
  entryComponents: [
    PanelviajesComponent //  ESTO SIRVE PARA CREAR COMPONENTES DINAMICOS, LE INDICAMO A ANGULAR QUE ESTE COMPONENTE SERA "INSTANCIADO EN RUNTIME"
  ],
  exports : [
    PanelviajesComponent,
    PanelviajesitermedioComponent,
    HeaderpanelviajesComponent
  ],
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        GooglePlaceModule,
        TranslateModule
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ComponentsModule      
    }
  }
 }
