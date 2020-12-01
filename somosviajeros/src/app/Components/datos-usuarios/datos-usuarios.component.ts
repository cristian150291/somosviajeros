import { Component, OnInit } from '@angular/core';
import { DatosUserModel } from '../../Core/Models/datosuser.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-datos-usuarios',
  templateUrl: './datos-usuarios.component.html',
  styleUrls: ['./datos-usuarios.component.sass']
})
export class DatosUsuariosComponent implements OnInit {

  public datosUserModel: DatosUserModel;
  private newEmp: string;

  constructor(
    private navegacion: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.datosUserModel = new DatosUserModel('','');
    this.newEmp = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  onSubmit (userForm){    
    if(this.newEmp == 'emp'){
      this.navegacion.navigate(['datospassword/' + this.datosUserModel.nombre + '/' + this.datosUserModel.apellido + '/' + this.newEmp]);
    }else{
      this.navegacion.navigate(['datospassword/' + this.datosUserModel.nombre + '/' + this.datosUserModel.apellido]);
    }
    userForm.reset();
  }

}
