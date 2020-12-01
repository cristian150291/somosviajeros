import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelviajesComponent } from './panelviajes.component';

describe('PanelviajesComponent', () => {
  let component: PanelviajesComponent;
  let fixture: ComponentFixture<PanelviajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelviajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
