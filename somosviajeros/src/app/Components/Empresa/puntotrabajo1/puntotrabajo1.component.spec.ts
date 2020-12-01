import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Puntotrabajo1Component } from './puntotrabajo1.component';

describe('Puntotrabajo1Component', () => {
  let component: Puntotrabajo1Component;
  let fixture: ComponentFixture<Puntotrabajo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Puntotrabajo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Puntotrabajo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
