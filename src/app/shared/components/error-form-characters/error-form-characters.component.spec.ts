import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormCharactersComponent } from './error-form-characters.component';

describe('ErrorFormCharactersComponent', () => {
  let component: ErrorFormCharactersComponent;
  let fixture: ComponentFixture<ErrorFormCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFormCharactersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFormCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
