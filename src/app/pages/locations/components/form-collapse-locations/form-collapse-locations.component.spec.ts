import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCollapseLocationsComponent } from './form-collapse-locations.component';

describe('FormCollapseLocationsComponent', () => {
  let component: FormCollapseLocationsComponent;
  let fixture: ComponentFixture<FormCollapseLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCollapseLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCollapseLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
