import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMapsComponent } from './model-maps.component';

describe('ModelMapsComponent', () => {
  let component: ModelMapsComponent;
  let fixture: ComponentFixture<ModelMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
