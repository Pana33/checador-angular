import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormMinlengthComponent } from './error-form-minlength.component';

describe('ErrorFormMinlengthComponent', () => {
  let component: ErrorFormMinlengthComponent;
  let fixture: ComponentFixture<ErrorFormMinlengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFormMinlengthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFormMinlengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
