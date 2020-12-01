import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBorradoresComponent } from './dash-borradores.component';

describe('DashBorradoresComponent', () => {
  let component: DashBorradoresComponent;
  let fixture: ComponentFixture<DashBorradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBorradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBorradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
