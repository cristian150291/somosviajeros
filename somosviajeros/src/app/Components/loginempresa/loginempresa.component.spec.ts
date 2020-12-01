import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginempresaComponent } from './loginempresa.component';

describe('LoginempresaComponent', () => {
  let component: LoginempresaComponent;
  let fixture: ComponentFixture<LoginempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
