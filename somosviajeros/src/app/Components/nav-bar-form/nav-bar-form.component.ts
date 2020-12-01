import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-form',
  templateUrl: './nav-bar-form.component.html',
  styleUrls: ['./nav-bar-form.component.sass']
})
export class NavBarFormComponent implements OnInit {

  @Input() msg :string;
  constructor(
    private location: Location,
    private navegation: Router
  ) { }

  ngOnInit(): void {
  }

  goback(){
    switch (this.msg) {
      case 'update':
        this.navegation.navigate(['/home-empresa/puntotrabajo1']);  
      break;      
      default:
        this.location.back();
      break;
    }
  }
}
