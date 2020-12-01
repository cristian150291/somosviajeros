import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoUsuarioComponent } from './Components/nuevo-usuario/nuevo-usuario.component';
import { HomeComponent } from './Components/Home/Home.component';
import { CodigoComponent } from './Components/codigo/codigo.component';
import { DatosUsuariosComponent } from './Components/datos-usuarios/datos-usuarios.component';
import { DatosPasswordComponent } from './Components/datos-password/datos-password.component';
import { NuevaEmpresaComponent } from './Components/Empresa/nueva-empresa/nueva-empresa.component';
import { HomeEmpresaComponent } from './Components/Empresa/home-empresa/home-empresa.component';
import { LoginempresaComponent } from './Components/loginempresa/loginempresa.component';
import { Puntotrabajo1Component } from './Components/Empresa/puntotrabajo1/puntotrabajo1.component';
import { NuevoCuitComponent } from './Components/Empresa/nuevo-cuit/nuevo-cuit.component';
import { DashboardComponent } from "./Components/Empresa/dashboard/dashboard.component";
import { UpdateuserComponent } from "./Components/UpdateUser/updateuser/updateuser.component";
import { OlvidepassComponent } from "./Components/UpdateUser/olvidepass/olvidepass.component";
import { OlvidepasscodigoComponent } from "./Components/UpdateUser/olvidepasscodigo/olvidepasscodigo.component";
import { OlvidepasscambioComponent } from "./Components/UpdateUser/olvidepasscambio/olvidepasscambio.component";
import { HomeviajerosComponent } from "./Components/Usuario/homeviajeros/homeviajeros.component";
import { InicioComponent } from "./Components/Usuario/inicio/inicio.component";
import { DashEntrantesComponent } from './Components/Empresa/dash-entrantes/dash-entrantes.component';
import { DashBorradoresComponent } from './Components/Empresa/dash-borradores/dash-borradores.component';
import { DashSinresponderComponent } from './Components/Empresa/dash-sinresponder/dash-sinresponder.component';
import { DetalleComponent } from './Components/Empresa/detalle/detalle.component';
import { DetallePresupuestoComponent } from './Components/Empresa/detalle-presupuesto/detalle-presupuesto.component';
import { DetalleCotizarComponent } from './Components/Empresa/detalle-cotizar/detalle-cotizar.component';
import { QuienessomosComponent } from './Components/Empresa/quienessomos/quienessomos.component';
import { FlotaComponent } from './Components/Empresa/flota/flota.component';
import { DatosextraComponent } from './Components/Viajes/datosextra/datosextra.component';
import { ConfirmardatosComponent } from './Components/Viajes/confirmardatos/confirmardatos.component';


const routes: Routes = [
  {path:'', component:HomeComponent},                             //HOME PRINCIPAL DE LA APP, CARGA USER Y SU LOGIN
  {path:'nuevouser', component:NuevoUsuarioComponent},
  {path:'nuevouser/:id', component:NuevoUsuarioComponent},
  {path:'home', component:HomeComponent},
  {path:'home/:id', component:HomeComponent},
  {path:'codigo/:email', component:CodigoComponent},
  {path:'codigo/:email/:id', component:CodigoComponent},
  {path:'datosusuario', component:DatosUsuariosComponent},
  {path:'datosusuario/:id', component:DatosUsuariosComponent},
  {path:'datospassword/:nombre/:apellido', component:DatosPasswordComponent},
  {path:'datospassword/:nombre/:apellido/:id', component:DatosPasswordComponent},  
  {path:'datosextra', component:DatosextraComponent},
  {path:'confirmardatos', component:ConfirmardatosComponent},
  //{path:'sucursal', component:SucursalComponent},
  //-----------------       HOME EMPRESA       -------------------------------------------------------------------------------------------
  {path:'home-empresa', component:HomeEmpresaComponent,           //HOME EMPRESA Y SUB-RUTAS DEL PROYECTO
    children:[
      {path:'',component:LoginempresaComponent},                            //LOGIN EMPRESA
      {path:'loginempresa', component:LoginempresaComponent},               //LOGIN EMPRESA
      {path:'nuevaempresa', component:NuevaEmpresaComponent},               //CARGA DE EMPRESA
      {path:'nuevocuit/:empresa', component:NuevoCuitComponent},            //ENVIO DE DATOS ENPRESA Y CUIT
      {path:'puntotrabajo1', component:Puntotrabajo1Component},             //CARGA DE CIUDADES EN MAPA      
      {path:'nuevaempresa/:update', component:NuevaEmpresaComponent},       //UPDATE EMPRESA
      {path:'nuevocuit/:empresa/:update', component:NuevoCuitComponent},    //UPDATE CUIT
      {path:'puntotrabajo1/:update', component:Puntotrabajo1Component},     //UPDATE PUNTOTRABAJO1
      {path:'quienessomos', component:QuienessomosComponent},               //QUIENES SOMOS
      {path:'flota', component:FlotaComponent},                             //FLOTA
      

      {path:'dashboard',component:DashboardComponent,                       //DASHBOARD PAGINA PRINCIPAL DE COTIZACIONES Y MANEJO PRINCIPAL DE EMPRESA.
        children:[
          {path:'',component:DashEntrantesComponent},                       //PRINCIPAL MUESTRA DE DASHBOARD, DATOS ENTRANTES DE PRESUPUESTOS.
          {path:'entrantes',component:DashEntrantesComponent},    
          {path:'borradores',component:DashBorradoresComponent},            //LISTA DE PRESUPUESTOS EN BORRADORES.
          {path:'sinresponder',component:DashSinresponderComponent}         //LISTA DE PRESUPUESTOS SIN RESPONDER.
        ]
      },
      
      {path:'detalle',component:DetalleComponent,                        //PRINCIPAL RUTA PARA DETALLE DE PRESUPUESTO.
        children:[
          {path:'presupuesto/:id',component:DetallePresupuestoComponent},//POR DEFAULT CARGAMOS EL DETALLE, QUE DEBE DE TENER EL ID DEL PRESUPUESTO PARA REALIZAR LA PETICION.
          {path:'cotizar',component:DetalleCotizarComponent}             //COTIZACION DEL PRESUPUESTO PARA ENVIAR AL CLIENTE O ELIMINARLA.
        ]
      }
    ] //FIN HIJOS HOME-EMPRESA
  },
  //-----------------       UPDATE USER       --------------------------------------------------------------------------------------------
  {path:'updateuser',component:UpdateuserComponent,                           //PUNTO DE PARTIDA PARA MANEJO DE UPDATE SOBRE LOS USUARIOS.
    children:[
      {path: 'enviomail',component: OlvidepassComponent, data:{animation:'enviomail'} },                     //ENVIO DE MAIL PARA RECUPERACION DE PASSWORD.
      {path: 'enviomail/:emp',component: OlvidepassComponent , data:{animation:'enviomail'}},
      {path: 'enviocodigo/:email',component: OlvidepasscodigoComponent , data:{animation:'enviocodigo'}},      //RECIBO CODIGO PARA VALIDAR MI USUARIO CON EL MAIL
      {path: 'enviocodigo/:email/:emp',component: OlvidepasscodigoComponent , data:{animation:'enviocodigo'}},
      {path: 'envionewpass',component: OlvidepasscambioComponent , data:{animation:'enviopass'} },           //RESTABLESCO CONTREASELA DEL USUARIO, AL FINALIZAR REENVIO AL LOGIN
      {path: 'envionewpass/:emp',component: OlvidepasscambioComponent , data:{animation:'enviopass'} }
    ]
  },
  //-----------------       HOME VIAJEROS      --------------------------------------------------------------------------------------------
  {path:'homeviajeros',component:HomeviajerosComponent,            //PUNTO DE PARTIDA PARA HOME DE USER Y MANEJO DE LA APP
    children:[
      {path: '',component: InicioComponent },                      //CARGA PREESTABLECIDA COMO ORIGEN PARA EL HOME DE USUARIO
      {path: 'inicio',component: InicioComponent},                 //CARGA DE INCIO DE USUARIO
    ]
  },
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
