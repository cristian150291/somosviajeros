import { Component, OnInit } from '@angular/core';
import { NuevaEmpresaModel } from '../../../Core/Models/Empresa/nueva-empresa.model';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserStorage } from '../../../Core/Models/storage.model';
import { StorageService } from '../../../Core/Services/storage.service';


@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.sass']
})

export class NuevaEmpresaComponent implements OnInit {

  public nuevaempresaModel: NuevaEmpresaModel;
  public update: string;
  private storage: StorageService;
  private uUser: UserStorage;

  constructor(
    private navegacion: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.update = this.activateRoute.snapshot.params.update;
    this.nuevaempresaModel = new NuevaEmpresaModel('', '');
    this.uUser = new UserStorage( '', '', '', '', '', '', '', '', '', false);
    this.storage = new StorageService();
  }

  ngOnInit(): void {
    if (this.update == 'update'){
      this.uUser.setSession(this.storage.getCurrentSession());
      this.uUser.setIsUpdate(true);      
      this.nuevaempresaModel.nombre = this.uUser.getEmpresa().nombre;
      this.storage.setCurrentSession(this.uUser);
    }
  }

  onSubmit(nuevaempresaFrom){
    if (this.update == 'update'){
      this.navegacion.navigate(['/home-empresa/nuevocuit/' + this.nuevaempresaModel.nombre + '/' + this.update]);
    }else{
      this.navegacion.navigate(['/home-empresa/nuevocuit/' + this.nuevaempresaModel.nombre]);
    }
  }

}
