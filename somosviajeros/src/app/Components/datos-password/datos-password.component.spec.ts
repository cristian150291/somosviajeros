import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPasswordComponent } from './datos-password.component';

describe('DatosPasswordComponent', () => {
  let component: DatosPasswordComponent;
  let fixture: ComponentFixture<DatosPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
