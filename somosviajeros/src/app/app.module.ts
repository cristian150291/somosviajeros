import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//IMPORT PARA PODER REALIZAR PETICIONES AJAX ( CLIENTE HTTP)
import { HttpClientModule, HttpClient } from "@angular/common/http";

//IMPORT DE RUTAS DE LA APLICACION
import { AppRoutingModule } from './app-routing.module';

//IMPORT DE TODO NUESTROS COMPONENTES QUE VAMOS A UTILIZAR EN LA APP
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/Home.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { LoginComponent } from './Components/login/login.component';
import { NuevoUsuarioComponent } from './Components/nuevo-usuario/nuevo-usuario.component';
import { DatosUsuariosComponent } from './Components/datos-usuarios/datos-usuarios.component';
import { DatosPasswordComponent } from './Components/datos-password/datos-password.component';
import { NuevoCuitComponent } from './Components/Empresa/nuevo-cuit/nuevo-cuit.component';
import { LoginempresaComponent } from './Components/loginempresa/loginempresa.component';
import { CodigoComponent } from './Components/codigo/codigo.component';
import { NuevaEmpresaComponent } from './Components/Empresa/nueva-empresa/nueva-empresa.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarFormComponent } from './Components/nav-bar-form/nav-bar-form.component';
import { HomeEmpresaComponent } from './Components/Empresa/home-empresa/home-empresa.component';
import { DashboardComponent } from './Components/Empresa/dashboard/dashboard.component';
import { UpdateuserComponent } from './Components/UpdateUser/updateuser/updateuser.component';
import { OlvidepassComponent } from './Components/UpdateUser/olvidepass/olvidepass.component';
import { OlvidepasscodigoComponent } from './Components/UpdateUser/olvidepasscodigo/olvidepasscodigo.component';
import { OlvidepasscambioComponent } from './Components/UpdateUser/olvidepasscambio/olvidepasscambio.component';
import { HomeviajerosComponent } from './Components/Usuario/homeviajeros/homeviajeros.component';
import { InicioComponent } from './Components/Usuario/inicio/inicio.component';
import { NavBarUserComponent } from './Components/Usuario/nav-bar-user/nav-bar-user.component';
import { NavBarEmpComponent } from './Components/Empresa/nav-bar-emp/nav-bar-emp.component';
import { DashEntrantesComponent } from './Components/Empresa/dash-entrantes/dash-entrantes.component';
import { DashBorradoresComponent } from './Components/Empresa/dash-borradores/dash-borradores.component';
import { DashSinresponderComponent } from './Components/Empresa/dash-sinresponder/dash-sinresponder.component';
import { DetalleComponent } from './Components/Empresa/detalle/detalle.component';
import { DetallePresupuestoComponent } from './Components/Empresa/detalle-presupuesto/detalle-presupuesto.component';
import { DetalleCotizarComponent } from './Components/Empresa/detalle-cotizar/detalle-cotizar.component';
import { Puntotrabajo1Component } from './Components/Empresa/puntotrabajo1/puntotrabajo1.component';
import { QuienessomosComponent } from './Components/Empresa/quienessomos/quienessomos.component';
import { FlotaComponent } from './Components/Empresa/flota/flota.component';


//IMPORT FORM MUDULE PARA USARLO EN LOS FORMULARIOS
import { FormsModule } from '@angular/forms';

//IMPORT PARA LIBRERIAS DE TRASNLATE , MANEJO DE IDIOMAS
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}


//IMPORMTAMOS MODULO PARA GOOGLE MAPS
import { GoogleMapsModule } from '@angular/google-maps';

//IMPORTAMOS MODULO PARA MANEJO DE AUTOCOMPLETE DE GOOGLE
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


//IMPORT DE MODULOS BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//AGM ANGULAR GOOGLE MAPS
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   // agm-direction

// IMPORT  DE MATERIAL PARA COMPONENTES PRE DISEÑADOS.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion'; 

// IMPORTO MODULO DE COMPONENTE BANDERES , PROPIO
import { BanderasModule } from './Components/banderas/banderas.module';

// IMPORTO COMPONETES CUSTOM DE LA APP
import { ComponentsModule } from './Components/Custom/components.module';

//IMPORT PARA RELIAZAR LOGIN CON REDES SOCIALES
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { DatosextraComponent } from './Components/Viajes/datosextra/datosextra.component';
import { ConfirmardatosComponent } from './Components/Viajes/confirmardatos/confirmardatos.component';


@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    NuevoUsuarioComponent,
    CodigoComponent,
    NuevoUsuarioComponent,
    DatosUsuariosComponent,
    DatosPasswordComponent,
    NuevaEmpresaComponent,
    FooterComponent,
    NavBarFormComponent,
    HomeEmpresaComponent,
    LoginempresaComponent,
    Puntotrabajo1Component,
    NuevoCuitComponent,
    DashboardComponent,    
    UpdateuserComponent,
    OlvidepassComponent,
    OlvidepasscodigoComponent,
    OlvidepasscambioComponent,
    HomeviajerosComponent,
    InicioComponent,
    NavBarUserComponent,
    NavBarEmpComponent,
    DashEntrantesComponent,
    DashBorradoresComponent,
    DashSinresponderComponent,
    DetalleComponent,
    DetallePresupuestoComponent,
    DetalleCotizarComponent,
    QuienessomosComponent,
    FlotaComponent,
    DatosextraComponent,
    ConfirmardatosComponent
  ],
  entryComponents: [
    //PanelviajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BanderasModule.forRoot(),            // MODULO PARA COMPONENTE DE BANDERAS
    ComponentsModule.forRoot(),
    //LoginsocialModule.forRoot(),         // MODULO PARA COMPONENTE DE LOGIN CON REDES SOCIALES
    HttpClientModule,
    MatFormFieldModule,                  // FORM MODULE ANGULAR MATERIAL   ( No se usa por el momento)
    MatSelectModule,                     // SELECT MODULE ANGULAR MATERIAL ( No se usa por el momento)
    MatSliderModule,                     // SLIDER MODULE DETALLE COTIZAR
    MatSlideToggleModule,                // TOGGLE MODULE DETALLE COTIZAR
    MatExpansionModule,                  // EXPANCION MODULE DETALLE COTIZAR
    SocialLoginModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GoogleMapsModule,
    GooglePlaceModule,
    NgbModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyAqt4iOo-B_D92aMHU09x78PZ4k_4FTHTY',
    }),
    AgmDirectionModule,
    BrowserAnimationsModule   // agm-direction        
  ],
  providers: [
    { //INICIO PROVIDES REDES SOCIALES
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { //GOOGLE aca se debe colocar la id de credenciales de google (visitar pagina de desarrollador)
            id: GoogleLoginProvider.PROVIDER_ID,            
            provider: new GoogleLoginProvider('963667483303-2djpjd5dogfser9jgpim7t26t3bhknlh.apps.googleusercontent.com')
          }
          ,
          { //FACEBOOK aca se debe colocar la id de credenciales de Facebook (visicar paginas de desarrollador)
            id: FacebookLoginProvider.PROVIDER_ID,
           provider: new FacebookLoginProvider('1085042821891815'),
          },
        ],
      } as SocialAuthServiceConfig,
    }  //FIN PROVIDERS REDES SOCIALES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
