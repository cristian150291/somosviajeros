import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../Core/Services/storage.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public vUser: UserStorage ;
  public storage: StorageService ;
  public empresa: any;
  public nombre: string;
  public apellido: string;
  public email: string;
  constructor(
      private navegacion: Router
  ) {
    this.storage = new StorageService();
    this.vUser = new UserStorage('', '', '', '', '', '', '', '', '', true);
    if (this.storage.getCurrentSession() != null){
      this.vUser.setSession(this.storage.getCurrentSession());
    }else{
      // SI NO TIENE DATOS, NO TIENE SESION, LO ENVIAMOS NUEVAMENTE AL HOME
    }
    this.empresa = this.vUser.getEmpresa();
    this.nombre = this.vUser.getName();
    this.apellido = this.vUser.getLastName();
    this.email = this.vUser.getEmail();
  }

  ngOnInit(): void {
  }
}
