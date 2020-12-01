import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCuitComponent } from './nuevo-cuit.component';

describe('NuevoCuitComponent', () => {
  let component: NuevoCuitComponent;
  let fixture: ComponentFixture<NuevoCuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
