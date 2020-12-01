import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicHost]'
})
export class DynamicHostDirective {

  constructor(
    // REFERENCIA A LA ETIQUETA QUE CONTENDRA EL HOST DEL FUTURO COMPONENTE
    public viewContainerRef : ViewContainerRef
  ) { 

  }

}
