import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { StorageService } from '../../../Core/Services/storage.service';
import { UserStorage } from '../../../Core/Models/storage.model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-datosextra',
  templateUrl: './datosextra.component.html',
  styleUrls: ['./datosextra.component.sass']
})
export class DatosextraComponent implements OnInit {

  public colorGreen = '#3AA776';
  public color : ThemePalette = 'warn';
  public panelOpenState = false;
  public mostrar = true;
  public storage : StorageService;
	public vUser : UserStorage;
	public nota2 : string;
  @ViewChild('nota') notaText: any;

  constructor(
    private navegacion: Router
  ) { 

  }

  ngOnInit(): void {
		this.storage = new StorageService();
		if( this.storage.existData('solicitud') ){
			let data = this.storage.loadData('solicitud');
			this.nota2 = data.nota;
		}
  }

  nextPage (){
    this.storage = new StorageService();
    let send = this.storage.loadData('solicitud');
    send['nota'] = this.notaText.nativeElement.value
    this.storage.setDataAny(send,'solicitud');
    this.navegacion.navigate(['/confirmardatos']);
  }

}
