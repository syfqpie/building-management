import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUnitsComponent } from './management-units.component';

describe('ManagementUnitsComponent', () => {
  let component: ManagementUnitsComponent;
  let fixture: ComponentFixture<ManagementUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
