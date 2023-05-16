import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsTableComponent } from './buttons-table.component';

describe('ButtonsTableComponent', () => {
  let component: ButtonsTableComponent;
  let fixture: ComponentFixture<ButtonsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
