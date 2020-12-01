import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePresupuestoComponent } from './detalle-presupuesto.component';

describe('DetallePresupuestoComponent', () => {
  let component: DetallePresupuestoComponent;
  let fixture: ComponentFixture<DetallePresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
