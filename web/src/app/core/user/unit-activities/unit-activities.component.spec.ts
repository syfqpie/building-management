import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitActivitiesComponent } from './unit-activities.component';

describe('UnitActivitiesComponent', () => {
  let component: UnitActivitiesComponent;
  let fixture: ComponentFixture<UnitActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
