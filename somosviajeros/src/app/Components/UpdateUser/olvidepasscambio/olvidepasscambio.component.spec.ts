import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidepasscambioComponent } from './olvidepasscambio.component';

describe('OlvidepasscambioComponent', () => {
  let component: OlvidepasscambioComponent;
  let fixture: ComponentFixture<OlvidepasscambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidepasscambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidepasscambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
