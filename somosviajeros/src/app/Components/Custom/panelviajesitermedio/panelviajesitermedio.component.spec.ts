import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelviajesitermedioComponent } from './panelviajesitermedio.component';

describe('PanelviajesitermedioComponent', () => {
  let component: PanelviajesitermedioComponent;
  let fixture: ComponentFixture<PanelviajesitermedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelviajesitermedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelviajesitermedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
