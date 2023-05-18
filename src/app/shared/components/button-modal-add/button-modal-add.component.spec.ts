import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModalAddComponent } from './button-modal-add.component';

describe('ButtonModalAddComponent', () => {
  let component: ButtonModalAddComponent;
  let fixture: ComponentFixture<ButtonModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonModalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
