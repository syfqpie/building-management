import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUnitsConfigurationsComponent } from './management-units-configurations.component';

describe('ManagementUnitsConfigurationsComponent', () => {
  let component: ManagementUnitsConfigurationsComponent;
  let fixture: ComponentFixture<ManagementUnitsConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementUnitsConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementUnitsConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
