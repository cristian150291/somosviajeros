import { Component, OnInit , Output, EventEmitter, Input, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-headerpanelviajes',
  templateUrl: './headerpanelviajes.component.html',
  styleUrls: ['./headerpanelviajes.component.sass']
})
export class HeaderpanelviajesComponent implements OnInit, AfterViewInit, OnChanges {

  @Output() ida = new EventEmitter<any>();
  @Output() idaVuelta = new EventEmitter<any>();
  @Output() multipunto = new EventEmitter<any>();
	@Input('isIda') isIda : boolean;
	@Input('isVuelta') isVuelta : boolean;
	@Input('isIdaVuelta') isIdaVuelta : boolean;

  public isActiveidv: boolean = true;
  public isActiveid: boolean = false;
  public isActivem: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

	ngOnChanges(){
		if( this.isIda ){
			this.isActiveid = true;
			this.isActiveidv = false;
			this.isActivem = false;
		}
		if ( this.isVuelta ){
			this.isActiveidv = true;
			this.isActiveid = false;
			this.isActivem = false;

		}
		if( this.isIdaVuelta ){
			this.isActivem = true;
			this.isActiveid = false;
			this.isActiveidv = false;
		}
	}

	ngAfterViewInit () {
	}

  selectIda (event: any){
    this.ida.emit(event);
    this.isActiveid = true;
    this.isActiveidv = false;
    this.isActivem = false;
  }

  selectiIdaVuelta (event: any){
    this.idaVuelta.emit(event);
    this.isActiveidv = true;
    this.isActiveid = false;
    this.isActivem = false;
  }

  selectMultipunto (event: any){
    this.multipunto.emit(event);
    this.isActivem = true;
    this.isActiveid = false;
    this.isActiveidv = false;
  }

}
