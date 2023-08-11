import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormRequiredComponent } from './error-form-required.component';

describe('ErrorFormRequiredComponent', () => {
  let component: ErrorFormRequiredComponent;
  let fixture: ComponentFixture<ErrorFormRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFormRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFormRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
