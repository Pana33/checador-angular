import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormEmployeeComponent } from './modal-form-employee.component';

describe('ModalFormEmployeeComponent', () => {
  let component: ModalFormEmployeeComponent;
  let fixture: ComponentFixture<ModalFormEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
