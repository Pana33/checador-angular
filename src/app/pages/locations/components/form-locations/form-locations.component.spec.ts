import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationsComponent } from './form-locations.component';

describe('FormLocationsComponent', () => {
  let component: FormLocationsComponent;
  let fixture: ComponentFixture<FormLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
