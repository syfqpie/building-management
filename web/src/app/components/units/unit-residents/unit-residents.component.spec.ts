import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitResidentsComponent } from './unit-residents.component';

describe('UnitResidentsComponent', () => {
  let component: UnitResidentsComponent;
  let fixture: ComponentFixture<UnitResidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitResidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
