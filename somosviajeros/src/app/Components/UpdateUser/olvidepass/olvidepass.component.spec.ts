import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidepassComponent } from './olvidepass.component';

describe('OlvidepassComponent', () => {
  let component: OlvidepassComponent;
  let fixture: ComponentFixture<OlvidepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
