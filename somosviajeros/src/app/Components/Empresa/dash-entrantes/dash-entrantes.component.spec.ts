import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEntrantesComponent } from './dash-entrantes.component';

describe('DashEntrantesComponent', () => {
  let component: DashEntrantesComponent;
  let fixture: ComponentFixture<DashEntrantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashEntrantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEntrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
