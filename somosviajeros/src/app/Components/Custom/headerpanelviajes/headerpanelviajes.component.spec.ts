import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpanelviajesComponent } from './headerpanelviajes.component';

describe('HeaderpanelviajesComponent', () => {
  let component: HeaderpanelviajesComponent;
  let fixture: ComponentFixture<HeaderpanelviajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderpanelviajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderpanelviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
