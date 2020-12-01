import { Component, OnInit, Input , Output } from '@angular/core';
import { Router } from '@angular/router';
import { navbar } from '../../../Animations/animations';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.sass'],
  animations: [ navbar ]
})
export class NavBarUserComponent implements OnInit {


  @Input() nameUser: string;
  public userName: string;
  public isOpen = false;
  toggle(): void {
       this.isOpen = !this.isOpen;
  }
  constructor(
      private navegacion: Router
  ) { }
  ngOnInit(): void {
    this.userName = this.nameUser;
  }
  // tslint:disable-next-line:typedef
  backRoddApp(){
    this.navegacion.navigate(['/homeviajeros/inicio']);
  }

}
