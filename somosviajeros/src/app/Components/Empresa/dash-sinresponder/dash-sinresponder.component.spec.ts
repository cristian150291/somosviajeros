import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSinresponderComponent } from './dash-sinresponder.component';

describe('DashSinresponderComponent', () => {
  let component: DashSinresponderComponent;
  let fixture: ComponentFixture<DashSinresponderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSinresponderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSinresponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
