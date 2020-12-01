import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCotizarComponent } from './detalle-cotizar.component';

describe('DetalleCotizarComponent', () => {
  let component: DetalleCotizarComponent;
  let fixture: ComponentFixture<DetalleCotizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCotizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
