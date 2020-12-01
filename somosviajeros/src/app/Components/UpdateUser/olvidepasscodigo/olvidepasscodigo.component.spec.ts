import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidepasscodigoComponent } from './olvidepasscodigo.component';

describe('OlvidepasscodigoComponent', () => {
  let component: OlvidepasscodigoComponent;
  let fixture: ComponentFixture<OlvidepasscodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidepasscodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidepasscodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
