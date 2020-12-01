import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-detalle-cotizar',
  templateUrl: './detalle-cotizar.component.html',
  styleUrls: ['./detalle-cotizar.component.sass']
})

export class DetalleCotizarComponent implements OnInit {

  public colorGreen = '#3AA776'; // verde  
  public color: ThemePalette = 'warn';
  public panelOpenState = true;
  public mostrar = true;

  constructor() { }

  ngOnInit(): void {
    
  }

}
