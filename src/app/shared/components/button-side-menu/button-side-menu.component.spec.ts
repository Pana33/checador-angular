import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSideMenuComponent } from './button-side-menu.component';

describe('ButtonSideMenuComponent', () => {
  let component: ButtonSideMenuComponent;
  let fixture: ComponentFixture<ButtonSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
