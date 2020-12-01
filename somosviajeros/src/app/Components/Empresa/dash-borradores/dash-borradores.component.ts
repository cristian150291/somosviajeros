import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-borradores',
  templateUrl: './dash-borradores.component.html',
  styleUrls: ['./dash-borradores.component.sass']
})
export class DashBorradoresComponent implements OnInit {

  public hayBorradores:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
