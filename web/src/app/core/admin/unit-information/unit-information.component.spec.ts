import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitInformationComponent } from './unit-information.component';

describe('UnitInformationComponent', () => {
  let component: UnitInformationComponent;
  let fixture: ComponentFixture<UnitInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
