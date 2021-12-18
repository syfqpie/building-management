import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBuildingsComponent } from './management-buildings.component';

describe('ManagementBuildingsComponent', () => {
  let component: ManagementBuildingsComponent;
  let fixture: ComponentFixture<ManagementBuildingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementBuildingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
