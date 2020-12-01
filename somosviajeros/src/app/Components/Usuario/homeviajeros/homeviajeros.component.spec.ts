import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeviajerosComponent } from './homeviajeros.component';

describe('HomeviajerosComponent', () => {
  let component: HomeviajerosComponent;
  let fixture: ComponentFixture<HomeviajerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeviajerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeviajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
